import { Inject, Injectable } from '@nestjs/common';
import { entityAssembler } from 'src/utils';

import { OrderService } from '../order/order.service';
import { customerDto } from './dto/customer.dto';
import { updatedCustomerDto } from './dto/updateCustomer.dto';
import { Customer } from './entities/customer.entity';
import { ICustomerRepository } from './repositories/interface/customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(OrderService) public readonly orderService: OrderService,
  ) {}
  async getAllCustomers(): Promise<any[]> {
    return await this.customerRepository.findAllItems();
  }
  async postCustomer(body: customerDto) {
    const customer = new Customer();
    const data: Customer = await entityAssembler(body, customer);
    return await this.customerRepository.postItem(data);
  }
  async deleteCustomer(id: number) {
    await this.customerRepository.getOneCustomer(id);
    await this.orderService.deleteRelatedOrdersWhereCustomerId(id);

    return await this.customerRepository.deleteItem(id);
  }
  async getOneCustomer(id: number) {
    return await this.customerRepository.getOneCustomer(id);
  }
  async updateCustomer(id: number, body: updatedCustomerDto) {
    return await this.customerRepository.updateCustomer(id, body);
  }
  async findOrderWhereCustomerId(id: number) {
    return await this.customerRepository.findOrderWhereCustomerId(id);
  }
}
