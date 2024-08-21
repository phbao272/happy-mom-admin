import { ROLES_TYPE } from "../utils/constants/roles";

export interface IUser {
  id: number;
  name: string;
  username: string;
  role: ROLES_TYPE;
}

export interface IUserToken {
  accessToken: string;
  refreshToken: string;
}

export interface ICredential {
  username: string;
  password: string;
}

export interface IUserLoginResponse extends IUserToken {
  user: IUser;
}
