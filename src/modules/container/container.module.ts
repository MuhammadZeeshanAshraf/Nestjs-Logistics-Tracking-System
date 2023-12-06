import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../order/entities/order.entity';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { Product } from '../product/entities/product.entity';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { Container } from './entities/container.entity';
import { ContainerRepository } from './repositories/container.repository';
import { IContainerRepository } from './repositories/interfaces/container.interface';

export const containerProvider = [
  {
    provide: IContainerRepository,
    useClass: ContainerRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Container, Product, Order]), OrderModule],
  providers: [ContainerService, ...containerProvider, OrderService],
  controllers: [ContainerController],
  exports: [ContainerService, ...containerProvider],
})
export class ContainerModule {}
