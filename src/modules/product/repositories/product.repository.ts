import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { FindOptionsBuilder } from 'src/common/findOptions';
import { Container } from 'src/modules/container/entities/container.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { noItemFound } from 'src/utils/item.notfound';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { IProductRepository } from './interfaces/product.interface';

@Injectable()
export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {
    super(repository);
  }

  async getOneProduct(id: number): Promise<Product[] | BadRequestException> {
    const result: Product[] = await this.repository.find({
      where: { id: id },
      withDeleted: true,
    });

    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound(this.tableName, id));
    }
  }
  async updateProduct(
    id: number,
    item: any,
  ): Promise<Product[] | BadRequestException> {
    await this.getOneProduct(id);

    return this.repository.update({ id: id }, item).then(
      (value) => {
        return value;
      },
      (error) => {
        return error;
      },
    );
  }

  async findContainersWhereProductId(
    id: number,
  ): Promise<Container[] | BadRequestException> {
    await this.getOneProduct(id);
    const findOptions = new FindOptionsBuilder();
    findOptions
      .where({ id: id })
      .withDeleted(true)
      .relation({ container: true });
    const result: Container[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((product) => product.container);
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('container', id));
    }
  }

  async findOrdersWhereProductId(
    id: number,
  ): Promise<Order[] | BadRequestException> {
    await this.getOneProduct(id);

    const findOptions = new FindOptionsBuilder<Product>();
    findOptions
      .where({ id: id })
      .withDeleted(true)
      .relation({
        container: { order: true },
      });

    const result: Order[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((product) =>
      product.container.flatMap((container) => container.order),
    );
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('order', id));
    }
  }
}
