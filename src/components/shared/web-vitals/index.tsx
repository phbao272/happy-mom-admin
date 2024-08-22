'use client';

import { useReportWebVitals } from 'next/web-vitals';

const WebVitals = () => {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'TTFB':
       console.log(`Thời gian phản hồi: ${(metric.value / 1000).toFixed(2)}s`)

        break;
      case 'FCP':
        console.log(`Thời gian hiển thị nội dung đầu tiên: ${(
            metric.value / 1000
          ).toFixed(2)}s`);
        break;
    }
  });

  return null;
};

export default WebVitals;