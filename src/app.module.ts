import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database';
import { ContainerModule } from './modules/container/container.module';
import { CustomerModule } from './modules/customers/customer.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { SaleAgentModule } from './modules/saleAgent/saleAgent.module';
import { validate } from './utils/env.validation';

@Module({
  imports: [
    OrderModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseModule,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    ContainerModule,
    ProductModule,
    CustomerModule,
    SaleAgentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
