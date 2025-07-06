import { FormData } from "../hooks/useSignupForm";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class SignupUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(form: FormData): Promise<void> {
    this.repo.register(form);
  }
}
