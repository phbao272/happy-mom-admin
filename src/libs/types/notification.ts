enum NotificationTypeEnum {
  VACCINATION_SCHEDULE = "VACCINATION_SCHEDULE",
  FOLLOW_UP = "FOLLOW_UP",
  PREGNANT = "PREGNANT",
  CHILD = "CHILD"
}

export type NotificationTypeWithEnum = {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
