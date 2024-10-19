export type IDeal = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  expiredAt: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrUpdateDealBody = {
  name: string;
  description: string;
  imageUrl: string;
  expiredAt: string;
  type: string;
};
