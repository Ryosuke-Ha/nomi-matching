export interface Area {
  id: number;
  name: string;
}

export interface AreaRepository {
  fetchAll(): Promise<Area[]>;
}
