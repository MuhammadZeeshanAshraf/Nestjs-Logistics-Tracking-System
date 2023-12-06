import { BadRequestException } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { Order } from 'src/modules/order/entities/order.entity';

import { SaleAgent } from '../../entities/saleAgent.entity';

export const ISaleAgentRepository = Symbol('ISaleAgentRepository');
export interface ISaleAgentRepository extends BaseRepository<SaleAgent> {
  getOneSaleAgent(id: number): Promise<SaleAgent[] | BadRequestException>;
  updateSaleAgent(
    id: number,
    item: any,
  ): Promise<SaleAgent[] | BadRequestException>;
  findOrderWhereSaleAgentId(id: number): Promise<Order[] | BadRequestException>;
}
