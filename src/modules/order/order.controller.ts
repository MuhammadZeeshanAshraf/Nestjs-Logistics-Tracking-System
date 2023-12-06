import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { orderDto } from './dto/order.dto';
import { updateOrderDto } from './dto/updateOrder.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}
  @ApiOperation({ description: 'Get all orders' })
  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @ApiOperation({ description: 'Create new order' })
  @Post()
  async createOrder(@Body() body: orderDto) {
    return this.orderService.createOrder(body);
  }
  @ApiOperation({ description: 'Get order by id' })
  @Get(':id')
  async getOrderWhereId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderWhereId(id);
  }
  @ApiOperation({ description: 'Update order by id' })
  @Patch(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateOrderDto,
  ) {
    return this.orderService.updateOrder(id, body);
  }
  @ApiOperation({ description: 'Get container where order id' })
  @Get('findcontainer/:id')
  async getContainerWhereOrderId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getContainerWhereOrderId(id);
  }
  @ApiOperation({ description: 'Get product where order id' })
  @Get('findproduct/:id')
  async getProductWhereOrderId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getProductWhereOrderId(id);
  }
  @ApiOperation({ description: 'Get customer where order id' })
  @Get('findcustomer/:id')
  async getCustomerWhereOrderId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getCustomerWhereOrderId(id);
  }
  @ApiOperation({ description: 'Get sale agent where order id' })
  @Get('findsaleagent/:id')
  async getSaleAgentWhereOrderId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getSaleAgentWhereOrderId(id);
  }
}
