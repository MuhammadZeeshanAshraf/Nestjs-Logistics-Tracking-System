import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '../order/entities/order.entity';
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';
import { SaleAgent } from './entities/saleAgent.entity';
import { ISaleAgentRepository } from './repositories/interface/saleAgent.interface';
import { SaleAgentRepository } from './repositories/saleAgent.repository';
import { saleAgentsController } from './saleAgent.controller';
import { SaleAgentService } from './saleAgent.service';

const saleAgentRepositoryProvider = [
  {
    provide: ISaleAgentRepository,
    useClass: SaleAgentRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([SaleAgent, Order]), OrderModule],
  controllers: [saleAgentsController],
  providers: [SaleAgentService, ...saleAgentRepositoryProvider, OrderService],
})
export class SaleAgentModule {}
