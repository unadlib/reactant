export interface IBook<T = IComment['id']> {
  id: string;
  name: string;
  count: number;
  price: number;
  comments: T[];
}

export type IBooks = Record<IBook['id'], IBook>;

export interface IComment<T = IUser['id']> {
  id: string;
  content: string;
  user: T;
}

export type IComments = Record<IComment['id'], IComment>;

export interface IUser {
  id: string;
  username: string;
}

export type IUsers = Record<IUser['id'], IUser>;
