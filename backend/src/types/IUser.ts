export interface IUser {
  id?: string;
  address: string;
  image?: string;
  nickname?: string;
  type?: UserType;
  socketId?: string;
}

export enum UserType {
  Admin = 'Admin',
  User = 'User',
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
