import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/database/repostory/base.repository';
import { FindOptionsBuilder } from 'src/common/findOptions';
import { Order } from 'src/modules/order/entities/order.entity';
import { noItemFound } from 'src/utils/item.notfound';
import { Repository } from 'typeorm';

import { SaleAgent } from '../entities/saleAgent.entity';
import { ISaleAgentRepository } from './interface/saleAgent.interface';

export class SaleAgentRepository
  extends BaseRepository<SaleAgent>
  implements ISaleAgentRepository
{
  constructor(
    @InjectRepository(SaleAgent)
    protected readonly repository: Repository<SaleAgent>,
  ) {
    super(repository);
  }

  async getOneSaleAgent(
    id: number,
  ): Promise<SaleAgent[] | BadRequestException> {
    const result: SaleAgent[] = await this.repository.find({
      where: { id: id },
      withDeleted: true,
    });
    if (result.length !== 0) {
      return result;
    } else {
      throw new BadRequestException(noItemFound(this.tableName, id));
    }
  }
  async updateSaleAgent(
    id: number,
    item: any,
  ): Promise<SaleAgent[] | BadRequestException> {
    await this.getOneSaleAgent(id);
    return await this.repository.update({ id: id }, item).then(
      (value) => {
        return value;
      },
      (error) => {
        return error;
      },
    );
  }
  async findOrderWhereSaleAgentId(
    id: number,
  ): Promise<Order[] | BadRequestException> {
    await this.getOneSaleAgent(id);
    const findOptions = new FindOptionsBuilder<SaleAgent>();
    findOptions.relation({ order: true }).withDeleted(true);
    return (await this.repository.find(findOptions.build())).flatMap(
      (saleAgent) => saleAgent.order,
    );
  }
}
