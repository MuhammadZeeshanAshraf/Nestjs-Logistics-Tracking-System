import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { FindOptionsBuilder } from 'src/common/findOptions';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { noItemFound } from 'src/utils/item.notfound';
import { EntityManager, Repository } from 'typeorm';

import { Container } from '../entities/container.entity';
import { IContainerRepository } from './interfaces/container.interface';

@Injectable()
export class ContainerRepository
  extends BaseRepository<Container>
  implements IContainerRepository
{
  constructor(
    @InjectRepository(Container)
    protected readonly repository: Repository<Container>,
    private readonly entityManager: EntityManager,
  ) {
    super(repository);
  }

  async getOneContainer(
    id: number,
  ): Promise<Container[] | BadRequestException> {
    const result: Container[] = await this.repository.find({
      where: { id: id },
      withDeleted: true,
    });

    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound(this.tableName, id));
    }
  }
  async updateContainer(
    id: number,
    item: any,
  ): Promise<Container[] | BadRequestException> {
    await this.getOneContainer(id);

    return this.repository.update({ id: id }, item).then(
      (value) => {
        return value;
      },
      (error) => {
        return error;
      },
    );
  }

  async deleteRelatedContainers(id: number): Promise<Container[]> {
    const relatedContainers = await this.repository.find({
      where: { productId: id },
    });

    if (relatedContainers.length > 0) {
      const delPromises = relatedContainers.map(async (item) => {
        await this.repository.softDelete(item.id);
      });
      await Promise.all(delPromises);
    }
    return relatedContainers;
  }
  async findProductWhereContainerId(
    id: number,
  ): Promise<Product[] | BadRequestException> {
    await this.getOneContainer(id);

    const findOptions = new FindOptionsBuilder<Container>();
    findOptions.where({ id: id }).relation({ product: true });
    findOptions.withDeleted(true);
    const result: Product[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((container) => container.product);
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('product', id));
    }
  }
  async findOrdersWhereContainerId(
    id: number,
  ): Promise<Order[] | BadRequestException> {
    await this.getOneContainer(id);

    const findOptions = new FindOptionsBuilder<Container>();
    findOptions.where({ id: id }).relation({ order: true });
    findOptions.withDeleted(true);
    const result: Order[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((container) => container.order);
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(
        noItemFound('order associated to container', id),
      );
    }
  }
}
