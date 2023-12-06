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

import { ContainerService } from './container.service';
import { containerDto } from './dto/container.dto';
import { updateContainerDto } from './dto/updateContainer.dto';

@ApiTags('Container')
@Controller('container')
export class ContainerController {
  constructor(private containerService: ContainerService) {}
  @ApiOperation({ description: 'Get all containers' })
  @Get()
  async getAll() {
    return this.containerService.getAllContainers();
  }
  @ApiOperation({ description: 'Get a container by id' })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.containerService.getOneContainer(id);
  }
  @ApiOperation({ description: 'Post a container' })
  @Post()
  async postOne(@Body() body: containerDto) {
    return this.containerService.postContainer(body);
  }
  @ApiOperation({ description: 'Update a container' })
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateContainerDto,
  ) {
    return this.containerService.updateContainer(id, body);
  }
  @ApiOperation({ description: 'Delete a container' })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.containerService.deleteContainer(id);
  }
  @ApiOperation({ description: 'Get all products where container id' })
  @Get('product/:id')
  async getProductWhereContainerId(@Param('id', ParseIntPipe) id: number) {
    return this.containerService.findProductWhereContainerId(id);
  }
  @ApiOperation({ description: 'Get all orders where container id' })
  @Get('orders/:id')
  async findOrdersWhereContainerId(@Param('id', ParseIntPipe) id: number) {
    return this.containerService.findOrdersWhereContainerId(id);
  }
}
