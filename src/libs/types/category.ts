export type CategoryItemType = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CategoryResponse = CategoryItemType[];
