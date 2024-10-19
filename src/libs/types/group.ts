export interface IGroup {
  id: string;
  name: string;
  background: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateOrUpdateGroupBody = {
  name: string;
  background?: string;
  description: string;
};
