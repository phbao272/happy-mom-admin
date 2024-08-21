"use client";

import { request } from "@/libs/requests";
import { Text, Stack, Highlight } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";

const MAX_LENGTH = isMobile ? 90 : 80;

export const Notification = () => {
  const [isShowMore, setShowMore] = React.useState(false);

  const { isLoading, data } = useQuery<{ key: string; value: string }>({
    queryKey: ["notification-web"],
    queryFn: async () => {
      const res = await request.get(`settings/key/NOTIFICATION_WEB`);
      return res.data;
    }
  });

  useEffect(() => {
    if (data?.value) {
      const notification = data?.value;
      const notificationLength = notification.length;

      if (notificationLength > MAX_LENGTH) {
        setShowMore(true);
      }
    }
  }, [data?.value]);

  if (isLoading || !data?.value) {
    return null;
  }

  const handleShowMore = () => {
    modals.open({
      title: "Chi tiết thông báo",
      children: <Text size="sm">{data?.value}</Text>
    });
  };

  return (
    <Stack
      style={{
        gap: "unset",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
      onClick={handleShowMore}
    >
      <Text
        style={{
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
          width: "fit-content"
        }}
      >
        <Highlight
          highlight={
            isShowMore ? data.value?.slice(0, MAX_LENGTH) + "..." : data.value
          }
        >
          {isShowMore ? data.value?.slice(0, MAX_LENGTH) + "..." : data.value}
        </Highlight>
      </Text>
      {isShowMore ? (
        <Text size="sm" color="#ff3105">
          ...Xem thêm
        </Text>
      ) : null}
    </Stack>
  );
};
