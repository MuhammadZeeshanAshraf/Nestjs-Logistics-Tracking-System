import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CustomerService } from './customer.service';
import { customerDto } from './dto/customer.dto';
import { updatedCustomerDto } from './dto/updateCustomer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ description: 'Get a customer by id' })
  @Get(':id')
  async getOneCustomer(@Param('id', ParseIntPipe) id: number) {
    return await this.customerService.getOneCustomer(id);
  }

  @ApiOperation({ description: 'Get all customers' })
  @Get()
  async getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @ApiOperation({ description: 'Create a customer' })
  @Post()
  async postCustomer(@Body() body: customerDto) {
    return this.customerService.postCustomer(body);
  }

  @ApiOperation({ description: 'Delete a customer' })
  @Delete(':id')
  async deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }

  @ApiOperation({ description: 'Update a customer' })
  @Patch(':id')
  async updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updatedCustomerDto,
  ) {
    return this.customerService.updateCustomer(id, body);
  }

  @ApiOperation({ description: 'Get all orders where customer id' })
  @Get('findorder/:id')
  async findOrderWhereCustomerId(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOrderWhereCustomerId(id);
  }
}
