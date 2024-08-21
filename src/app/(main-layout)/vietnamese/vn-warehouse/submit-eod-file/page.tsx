import { SubmitDispatchFile } from "@/components/features/vietnamese/vn-warehouse";
import { SubmitEODFile } from "@/components/features/vietnamese/vn-warehouse/submit-eod-file";
import { Stack } from "@mantine/core";
import React from "react";

const Page = () => {
  return (
    <Stack gap={200}>
      <SubmitEODFile />

      <SubmitDispatchFile />
    </Stack>
  );
};

export default Page;
