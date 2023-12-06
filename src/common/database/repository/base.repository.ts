import { Repository } from 'typeorm';

export class BaseRepository<T> {
  public readonly tableName: string;
  constructor(protected repository: Repository<T>) {
    this.tableName = this.repository.metadata.tableName;
  }
  async findAllItems(): Promise<T[]> {
    return await this.repository.find();
  }
  async postItem(item: T): Promise<T> {
    return await this.repository.save(item);
  }
  async deleteItem(id: number) {
    return await this.repository.softDelete(id);
  }
}
