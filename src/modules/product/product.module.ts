import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContainerModule } from '../container/container.module';
import { ContainerService } from '../container/container.service';
import { Container } from '../container/entities/container.entity';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { IProductRepository } from './repositories/interfaces/product.interface';
import { ProductRepository } from './repositories/product.repository';

export const productProvider = [
  {
    provide: IProductRepository,
    useClass: ProductRepository,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Container]),
    ContainerModule,
    OrderModule,
  ],
  providers: [
    ProductService,
    ...productProvider,
    ContainerService,
    OrderService,
  ],
  controllers: [ProductController],
  exports: [ProductService, ...productProvider],
})
export class ProductModule {}
