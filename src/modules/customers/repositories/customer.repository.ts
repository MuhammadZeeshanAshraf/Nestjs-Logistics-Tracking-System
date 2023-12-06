import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { FindOptionsBuilder } from 'src/common/findOptions';
import { Order } from 'src/modules/order/entities/order.entity';
import { noItemFound } from 'src/utils/item.notfound';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { ICustomerRepository } from './interface/customer.interface';

export class CustomerRepository
  extends BaseRepository<Customer>
  implements ICustomerRepository
{
  constructor(
    @InjectRepository(Customer)
    protected readonly repository: Repository<Customer>,
  ) {
    super(repository);
  }

  async getOneCustomer(id: number): Promise<Customer[]> {
    const result: Customer[] = await this.repository.find({
      where: { id: id },
      withDeleted: true,
    });
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound('customer', id));
    }
  }
  async updateCustomer(
    id: number,
    item: any,
  ): Promise<Customer[] | BadRequestException> {
    await this.getOneCustomer(id);
    return await this.repository.update({ id: id }, item).then(
      (value) => {
        return value;
      },
      (error) => {
        return error;
      },
    );
  }
  async findOrderWhereCustomerId(
    id: number,
  ): Promise<Order[] | BadRequestException> {
    await this.getOneCustomer(id);
    const findOptions = new FindOptionsBuilder<Customer>();
    findOptions.relation({ order: true }).withDeleted(true);
    return (await this.repository.find(findOptions.build())).flatMap(
      (customer) => customer.order,
    );
  }
}
