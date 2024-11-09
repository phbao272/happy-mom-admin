# Sử dụng hình ảnh Node.js cơ bản
FROM node:20-alpine3.16 AS base

# Bước cài đặt dependencies chỉ khi cần thiết
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Cài đặt dependencies dựa trên package manager ưa thích
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Bước build mã nguồn chỉ khi cần thiết
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Ảnh production, sao chép tất cả các file cần thiết và chạy next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Tối ưu hóa kích thước ảnh bằng output file tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
