import { Inject, Injectable } from '@nestjs/common';
import { entityAssembler } from 'src/utils';

import { OrderService } from '../order/order.service';
import { saleAgentDto } from './dto/saleAgent.dto';
import { updateSaleAgentDto } from './dto/updateSaleAgent.dto';
import { SaleAgent } from './entities/saleAgent.entity';
import { ISaleAgentRepository } from './repositories/interface/saleAgent.interface';

@Injectable()
export class SaleAgentService {
  constructor(
    @Inject(ISaleAgentRepository)
    private readonly saleAgentRepository: ISaleAgentRepository,
    @Inject(OrderService) public readonly orderService: OrderService,
  ) {}
  async getAllSaleAgents(): Promise<any[]> {
    return await this.saleAgentRepository.findAllItems();
  }
  async postSaleAgent(body: saleAgentDto) {
    const saleAgent = new SaleAgent();
    const data: SaleAgent = await entityAssembler(body, saleAgent);
    return await this.saleAgentRepository.postItem(data);
  }
  async deleteSaleAgent(id: number) {
    await this.saleAgentRepository.getOneSaleAgent(id);
    await this.orderService.deleteRelatedOrdersWhereSaleAgentId(id);

    return await this.saleAgentRepository.deleteItem(id);
  }
  async getOneSaleAgent(id: number) {
    return await this.saleAgentRepository.getOneSaleAgent(id);
  }
  async updateSaleAgent(id: number, body: updateSaleAgentDto) {
    return await this.saleAgentRepository.updateSaleAgent(id, body);
  }
  async findOrderWhereSaleAgentId(id: number) {
    return this.saleAgentRepository.findOrderWhereSaleAgentId(id);
  }
}
