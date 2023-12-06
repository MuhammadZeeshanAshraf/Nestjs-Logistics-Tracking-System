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

import { saleAgentDto } from './dto/saleAgent.dto';
import { updateSaleAgentDto } from './dto/updateSaleAgent.dto';
import { SaleAgentService } from './saleAgent.service';

@ApiTags('Sale Agent')
@Controller('saleagent')
export class saleAgentsController {
  constructor(private readonly saleAgentService: SaleAgentService) {}
  @ApiOperation({ description: 'Get sale agent by id' })
  @Get(':id')
  async getOneSaleAgent(@Param('id', ParseIntPipe) id: number) {
    return await this.saleAgentService.getOneSaleAgent(id);
  }
  @ApiOperation({ description: 'Get all sale agents' })
  @Get()
  async getAllSaleAgents() {
    return this.saleAgentService.getAllSaleAgents();
  }
  @ApiOperation({ description: 'Post sale agent' })
  @Post()
  async postSaleAgent(@Body() body: saleAgentDto) {
    return this.saleAgentService.postSaleAgent(body);
  }
  @ApiOperation({ description: 'Delete sale agent' })
  @Delete(':id')
  async deleteSaleAgent(@Param('id', ParseIntPipe) id: number) {
    return this.saleAgentService.deleteSaleAgent(id);
  }
  @ApiOperation({ description: 'Update sale agent' })
  @Patch(':id')
  async updateSaleAgent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateSaleAgentDto,
  ) {
    return this.saleAgentService.updateSaleAgent(id, body);
  }
  @ApiOperation({ description: 'Get all orders where sale agent id' })
  @Get('findorder/:id')
  async findOrderWhereSaleAgentId(@Param('id', ParseIntPipe) id: number) {
    return this.saleAgentService.findOrderWhereSaleAgentId(id);
  }
}
