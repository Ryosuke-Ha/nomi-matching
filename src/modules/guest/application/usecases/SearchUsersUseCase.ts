import { User } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";

export class SearchUsersUseCase {
  constructor(private readonly repo: UserRepository) {}

  async execute(age: string, gender: string, region: string): Promise<User[]> {
    return this.repo.search({ age, gender, region });
  }
}
