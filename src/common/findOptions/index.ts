import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';

export interface FindOptions<T> {
  select: FindOptionsSelect<T>;
  where: FindOptionsWhere<T>;
  relations: FindOptionsRelations<T>;
  order: FindOptionsOrder<T>;
  withDeleted: boolean;
}
export class FindOptionsBuilder<T> {
  private selectOption: FindOptionsSelect<T>;
  private whereOption: FindOptionsWhere<T>;
  private relationOption: FindOptionsRelations<T>;
  private orderOption: FindOptionsOrder<T>;
  private deleted: boolean;

  select(options: FindOptionsSelect<T>): FindOptionsBuilder<T> {
    this.selectOption = options;
    return this;
  }
  where(options: FindOptionsWhere<T>): FindOptionsBuilder<T> {
    this.whereOption = options;
    return this;
  }
  relation(options: FindOptionsRelations<T>): FindOptionsBuilder<T> {
    this.relationOption = options;
    return this;
  }
  order(options: FindOptionsOrder<T>): FindOptionsBuilder<T> {
    this.orderOption = options;
    return this;
  }
  withDeleted(options: boolean): FindOptionsBuilder<T> {
    this.deleted = options;
    return this;
  }
  build(): FindOptions<T> {
    return {
      select: this.selectOption,
      where: this.whereOption,
      relations: this.relationOption,
      order: this.orderOption,
      withDeleted: this.deleted,
    };
  }
}
