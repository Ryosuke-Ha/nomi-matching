import { User } from "../models/User";

export interface UserRepository {
  verifyUserCredentials(id: string, password: string): Promise<boolean>;

  search(params: {
    age?: string;
    gender?: string;
    region?: string;
  }): Promise<User[]>;
}
