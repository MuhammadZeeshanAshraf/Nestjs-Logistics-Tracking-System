import { BadRequestException } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';

import { Container } from '../../entities/container.entity';

export const IContainerRepository = Symbol('IContainerRepository');
export interface IContainerRepository extends BaseRepository<Container> {
  getOneContainer(id: number): Promise<Container[] | BadRequestException>;
  updateContainer(
    id: number,
    item: any,
  ): Promise<Container[] | BadRequestException>;
  deleteRelatedContainers(id: number): Promise<Container[]>;
  findProductWhereContainerId(
    id: number,
  ): Promise<Product[] | BadRequestException>;
  findOrdersWhereContainerId(
    id: number,
  ): Promise<Order[] | BadRequestException>;
}
