import { User } from "../models/User";

export interface UserRepository {
  search(params: {
    age?: string;
    gender?: string;
    region?: string;
  }): Promise<User[]>;
}
