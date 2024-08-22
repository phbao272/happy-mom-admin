export interface IAuthor {
  id: string;
  username: string;
}

export interface IPost {
  id: string;
  content: string;
  images: string[];
  authorId: string;
  groupId?: string;
  createdAt: string;
  updatedAt: string;

  comments: IComment[];
  likes: ILike[];
  group: IGroup;

  author: IAuthor;
  _count: ICount;
}

export interface IComment {
  id: string;
  content: string;
  images: string[];
  postId: string;
  authorId: string;
  parentId?: string | null;
  author: IAuthor;

  childrens: IComment[];

  createdAt: string;
  updatedAt: string;
}

export interface ILike {
  id: string;
  postId: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICount {
  comments: number;
  likes: number;
}

export interface IGroup {
  id: string;
  name: string;
  description: string;
  background: string;
  createdAt: string;
  updatedAt: string;
}
