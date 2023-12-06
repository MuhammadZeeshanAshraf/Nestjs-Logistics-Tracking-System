import { BadRequestException } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { Container } from 'src/modules/container/entities/container.entity';
import { Order } from 'src/modules/order/entities/order.entity';

import { Product } from '../../entities/product.entity';

export const IProductRepository = Symbol('IProductRepository');
export interface IProductRepository extends BaseRepository<Product> {
  getOneProduct(id: number): Promise<Product[] | BadRequestException>;
  updateProduct(
    id: number,
    item: any,
  ): Promise<Product[] | BadRequestException>;
  findOrdersWhereProductId(id: number): Promise<Order[] | BadRequestException>;
  findContainersWhereProductId(
    id: number,
  ): Promise<Container[] | BadRequestException>;
}
