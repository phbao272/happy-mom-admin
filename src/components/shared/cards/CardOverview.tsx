"use client";

import { Flex, Stack, Text } from "@mantine/core";
import React from "react";

interface Props {
  value: string;
  label: string;
  icon: React.FC<any>;
  bgColor: string;
  symbol?: string;
}

export const CardOverview = ({
  value,
  label,
  icon: Icon,
  bgColor,
  symbol
}: Props) => {
  return (
    <Flex
      p={16}
      justify={"space-between"}
      bg={bgColor}
      style={{
        borderRadius: 8
      }}
    >
      <Stack gap={0}>
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: 500
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15
          }}
        >
          {label} {symbol ? `(${symbol})` : ""}
        </Text>
      </Stack>
    </Flex>
  );
};
