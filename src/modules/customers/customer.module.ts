import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../order/entities/order.entity';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { CustomersController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CustomerRepository } from './repositories/customer.repository';
import { ICustomerRepository } from './repositories/interface/customer.interface';

const customerRepositoryProvider = [
  {
    provide: ICustomerRepository,
    useClass: CustomerRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Order]), OrderModule],
  controllers: [CustomersController],
  providers: [CustomerService, ...customerRepositoryProvider, OrderService],
})
export class CustomerModule {}
