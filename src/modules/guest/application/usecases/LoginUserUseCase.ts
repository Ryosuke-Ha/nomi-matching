import { UserRepository } from "../../domain/repositories/UserRepository";

export class LoginUserUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(id: string, password: string): Promise<void> {
    this.repo.verifyUserCredentials(id, password);
  }
}
