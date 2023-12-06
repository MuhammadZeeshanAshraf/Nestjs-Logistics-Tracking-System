import { BadRequestException } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { Container } from 'src/modules/container/entities/container.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { SaleAgent } from 'src/modules/saleAgent/entities/saleAgent.entity';

import { Order } from '../../entities/order.entity';

export const IOrderRepository = Symbol('IOrderRepository');

export interface IOrderRepository extends BaseRepository<Order> {
  getOneOrder(id: number): Promise<Order[] | BadRequestException>;
  updateOrder(id: number, data: any): Promise<Order[] | BadRequestException>;
  getContainerWhereOrderId(
    id: number,
  ): Promise<Container[] | BadRequestException>;
  getProductWhereOrderId(id: number): Promise<Product[] | BadRequestException>;
  getCustomerWhereOrderId(
    id: number,
  ): Promise<Customer[] | BadRequestException>;
  getSaleAgentWhereOrderId(
    id: number,
  ): Promise<SaleAgent[] | BadRequestException>;
  getOrderRelations(id: number): Promise<any>;
  deleteRelatedOrdersWhereContainerId(id: number): Promise<void>;
  deleteRelatedOrdersWhereCustomerId(id: number): Promise<void>;
  deleteRelatedOrdersWhereSaleAgentId(id: number): Promise<void>;
}
