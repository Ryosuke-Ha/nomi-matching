import { AreaRepository, Area } from "../../domain/repositories/AreaRepository";

export class FetchAreasUseCase {
  constructor(private readonly repo: AreaRepository) {}

  async execute(): Promise<Area[]> {
    return this.repo.fetchAll();
  }
}
