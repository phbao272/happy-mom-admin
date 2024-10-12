export interface IArticle {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  content: string;
  categoryId: string;
  subCategory: SubCategoryType;
  subCategoryId: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;

  // comments: IComment[];
  // likes: ILike[];
  // group: IGroup;

  // author: IAuthor;
  // _count: ICount;
}

export type SubCategoryType = {
  category: {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
  categoryId: string;
  createdAt: string;
  description: string | null;
  id: string;
  image: string;
  name: string;
  updatedAt: string;
};

export type CreateOrUpdateArticleBody = {
  thumbnail: string;
  title: string;
  description?: string;
  content: string;
  images?: string[];
  subCategoryId: string;
};
