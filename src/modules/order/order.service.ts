import { Inject, Injectable } from '@nestjs/common';
import { entityAssembler } from '../../utils/index';

import { orderDto } from './dto/order.dto';
import { updateOrderDto } from './dto/updateOrder.dto';
import { Order } from './entities/order.entity';
import { IOrderRepository } from './repositories/interface/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async getAllOrders() {
    return await this.orderRepository.findAllItems();
  }
  async getOrderWhereId(id: number) {
    return this.orderRepository.getOneOrder(id);
  }
  async createOrder(body: orderDto) {
    const order = new Order();
    const data: Order = await entityAssembler(body, order);
    data.total = +data.quantity * +data.rate;
    return this.orderRepository.postItem(data);
  }
  async deleteOrder(id: number) {
    return this.orderRepository.deleteItem(id);
  }
  async deleteRelatedOrdersWhereContainerId(id: number) {
    return this.orderRepository.deleteRelatedOrdersWhereContainerId(id);
  }
  async deleteRelatedOrdersWhereCustomerId(id: number) {
    return this.orderRepository.deleteRelatedOrdersWhereCustomerId(id);
  }
  async deleteRelatedOrdersWhereSaleAgentId(id: number) {
    return this.orderRepository.deleteRelatedOrdersWhereSaleAgentId(id);
  }
  async updateOrder(id: number, body: updateOrderDto) {
    if (body.quantity && body.rate) {
      body.total = +body.quantity * +body.rate;
    }
    if ((body.quantity && !body.rate) || (body.rate && !body.quantity)) {
      return `Must provide both quantity and rate`;
    }
    return this.orderRepository.updateOrder(id, body);
  }
  async getContainerWhereOrderId(id: number) {
    return await this.orderRepository.getContainerWhereOrderId(id);
  }
  async getProductWhereOrderId(id: number) {
    return await this.orderRepository.getProductWhereOrderId(id);
  }
  async getCustomerWhereOrderId(id: number) {
    return await this.orderRepository.getCustomerWhereOrderId(id);
  }
  async getSaleAgentWhereOrderId(id: number) {
    return await this.orderRepository.getSaleAgentWhereOrderId(id);
  }
}
