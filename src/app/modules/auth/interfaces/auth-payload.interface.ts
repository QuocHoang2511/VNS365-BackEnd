export interface IRefreshJWT extends IUserJWT {
  refreshToken: string;
}

export interface IUserJWT {
  userId: number;
  username: string;
}
