import { Inject, Injectable } from '@nestjs/common';
import { entityAssembler } from '../../utils/index';

import { OrderService } from '../order/order.service';
import { containerDto } from './dto/container.dto';
import { updateContainerDto } from './dto/updateContainer.dto';
import { Container } from './entities/container.entity';
import { IContainerRepository } from './repositories/interfaces/container.interface';

@Injectable()
export class ContainerService {
  constructor(
    @Inject(IContainerRepository)
    private readonly containerRepository: IContainerRepository,
    @Inject(OrderService) public readonly orderService: OrderService,
  ) {}

  //BaseRep use

  async getAllContainers() {
    return await this.containerRepository.findAllItems();
  }
  async postContainer(body: containerDto) {
    const container = new Container();

    const data: Container = await entityAssembler<Container, containerDto>(
      body,
      container,
    );

    return await this.containerRepository.postItem(data);
  }
  async deleteContainer(id: number) {
    await this.containerRepository.getOneContainer(id);
    await this.orderService.deleteRelatedOrdersWhereContainerId(id);

    return await this.containerRepository.deleteItem(id);
  }

  //Container Rep use

  async getOneContainer(id: number) {
    return await this.containerRepository.getOneContainer(id);
  }

  async updateContainer(id: number, body: updateContainerDto) {
    return await this.containerRepository.updateContainer(id, body);
  }
  async deleteRelatedContainers(id: number) {
    const relatedContainersIds = (
      await this.containerRepository.deleteRelatedContainers(id)
    ).map(async (item) => {
      await this.orderService.deleteRelatedOrdersWhereContainerId(item.id);
    });
    await Promise.all(relatedContainersIds);
  }
  async findProductWhereContainerId(id: number) {
    return await this.containerRepository.findProductWhereContainerId(id);
  }
  async findOrdersWhereContainerId(id: number) {
    return await this.containerRepository.findOrdersWhereContainerId(id);
  }
}
