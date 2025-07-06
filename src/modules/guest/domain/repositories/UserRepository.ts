import { User } from "../models/User";
import { FormData } from "../../application//hooks/useSignupForm";

export interface UserRepository {
  verifyUserCredentials(id: string, password: string): Promise<boolean>;

  register(form: FormData): Promise<void>;

  search(params: {
    age?: string;
    gender?: string;
    region?: string;
  }): Promise<User[]>;
}
