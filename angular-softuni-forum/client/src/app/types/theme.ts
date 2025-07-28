import { User } from './user';

export interface Theme {
  subscribers: string[];
  posts: string[];
  _id: string;
  themeName: string;
  userId: User;
  created_at: Date;
  updatedAt: Date;
  __v: 0;
}
