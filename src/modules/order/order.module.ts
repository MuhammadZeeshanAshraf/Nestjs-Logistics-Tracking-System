import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Container } from '../container/entities/container.entity';
import { Customer } from '../customers/entities/customer.entity';
import { SaleAgent } from '../saleAgent/entities/saleAgent.entity';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { IOrderRepository } from './repositories/interface/order.interface';
import { OrderRepository } from './repositories/order.repository';

const orderRepositoryProvide = [
  {
    provide: IOrderRepository,
    useClass: OrderRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Order, Container, Customer, SaleAgent])],
  controllers: [OrderController],
  providers: [OrderService, ...orderRepositoryProvide],
  exports: [OrderService, ...orderRepositoryProvide],
})
export class OrderModule {}
