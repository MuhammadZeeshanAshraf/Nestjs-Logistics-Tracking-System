import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { FindOptionsBuilder } from 'src/common/findOptions';
import { Container } from 'src/modules/container/entities/container.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { SaleAgent } from 'src/modules/saleAgent/entities/saleAgent.entity';
import { noItemFound } from 'src/utils/item.notfound';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { IOrderRepository } from './interface/order.interface';

@Injectable()
export class OrderRepository
  extends BaseRepository<Order>
  implements IOrderRepository
{
  constructor(
    @InjectRepository(Order) protected readonly repository: Repository<Order>,
  ) {
    super(repository);
  }
  async getOneOrder(id: number): Promise<Order[] | BadRequestException> {
    const result: Order[] = await this.repository.find({
      where: { id: id },
      withDeleted: true,
    });

    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound(this.tableName, id));
    }
  }
  async updateOrder(
    id: number,
    data: any,
  ): Promise<Order[] | BadRequestException> {
    await this.getOneOrder(id);

    return await this.repository.update({ id: id }, data).then(
      (value) => {
        return value;
      },
      (error) => {
        return error;
      },
    );
  }
  async getContainerWhereOrderId(
    id: number,
  ): Promise<Container[] | BadRequestException> {
    await this.getOneOrder(id);

    const findOptions = new FindOptionsBuilder<Order>();
    findOptions.where({ id: id }).withDeleted(true).relation({
      container: true,
    });

    const result: Container[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((order) => order.container);
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('container', id));
    }
  }
  async getCustomerWhereOrderId(
    id: number,
  ): Promise<Customer[] | BadRequestException> {
    await this.getOneOrder(id);

    const findOptions = new FindOptionsBuilder<Order>();
    findOptions.where({ id: id }).withDeleted(true).relation({
      customer: true,
    });

    const result: Customer[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((order) => order.customer);
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('customer', id));
    }
  }
  async getSaleAgentWhereOrderId(
    id: number,
  ): Promise<SaleAgent[] | BadRequestException> {
    await this.getOneOrder(id);

    const findOptions = new FindOptionsBuilder<Order>();
    findOptions.where({ id: id }).withDeleted(true).relation({
      saleAgent: true,
    });

    const result: SaleAgent[] = (
      await this.repository.find(findOptions.build())
    ).flatMap((order) => order.saleAgent);
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('sale agent', id));
    }
  }
  async getOrderRelations(id: number): Promise<any> {
    await this.getOneOrder(id);

    const findOptions = new FindOptionsBuilder<Order>();
    findOptions
      .where({ id: id })
      .withDeleted(true)
      .relation({
        container: {
          product: true,
        },
      });

    const result: Order[] = await this.repository.find(findOptions.build());
    return result;
  }

  async getProductWhereOrderId(
    id: number,
  ): Promise<Product[] | BadRequestException> {
    const result: Order[] = await this.getOrderRelations(id);

    if (result.length !== 0) {
      const trueResult = result.flatMap((order) => {
        return order.container.product;
      });

      if (trueResult.length !== 0) {
        return trueResult;
      } else {
        throw new BadRequestException(noItemFound('product', id));
      }
    }
  }
  async deleteRelatedOrdersWhereContainerId(id: number) {
    const relatedOrders = await this.repository.find({
      where: { containerId: id },
    });

    if (relatedOrders.length > 0) {
      const delPromises = relatedOrders.map(async (item) => {
        await this.repository.softDelete(item.id);
      });
      await Promise.all(delPromises);
    }
  }
  async deleteRelatedOrdersWhereCustomerId(id: number) {
    const relatedOrders = await this.repository.find({
      where: { customerId: id },
    });

    if (relatedOrders.length > 0) {
      const delPromises = relatedOrders.map(async (item) => {
        await this.repository.softDelete(item.id);
      });
      await Promise.all(delPromises);
    }
  }
  async deleteRelatedOrdersWhereSaleAgentId(id: number) {
    const relatedOrders = await this.repository.find({
      where: { saleAgentId: id },
    });

    if (relatedOrders.length > 0) {
      const delPromises = relatedOrders.map(async (item) => {
        await this.repository.softDelete(item.id);
      });
      await Promise.all(delPromises);
    }
  }
}
