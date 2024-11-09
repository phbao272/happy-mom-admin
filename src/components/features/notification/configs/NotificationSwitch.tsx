import { NotificationTypeWithEnum } from "@/libs/types";
import { MRT_Row } from "mantine-react-table";
import React from "react";
import { Switch } from "@mantine/core";
import { useChangeActiveNotify } from "../hooks";

type NotificationSwitchProps = {
  row: MRT_Row<NotificationTypeWithEnum>;
};

const NotificationSwitch: React.FC<NotificationSwitchProps> = ({ row }) => {
  const id = row.getValue<string>("id");
  const isActive = row.getValue<boolean>("isActive");
  const { mutate, isPending } = useChangeActiveNotify();

  return (
    <Switch
      checked={isActive}
      disabled={isPending}
      onChange={() => mutate({ id })}
      label="Active"
    />
  );
};

export default NotificationSwitch;
