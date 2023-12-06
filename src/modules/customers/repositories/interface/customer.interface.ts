import { BadRequestException } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { Order } from 'src/modules/order/entities/order.entity';

import { Customer } from '../../entities/customer.entity';

export const ICustomerRepository = Symbol('ICustomerRepository');
export interface ICustomerRepository extends BaseRepository<Customer> {
  getOneCustomer(id: number): Promise<Customer[] | BadRequestException>;
  updateCustomer(
    id: number,
    item: any,
  ): Promise<Customer[] | BadRequestException>;
  findOrderWhereCustomerId(id: number): Promise<Order[] | BadRequestException>;
}
