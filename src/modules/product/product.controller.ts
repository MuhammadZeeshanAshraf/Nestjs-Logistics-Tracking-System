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
import { ApiBadRequestResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { productDto } from './dto/product.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @ApiOperation({ description: 'Get all products' })
  @Get()
  async getAll() {
    return this.productService.getAllProducts();
  }
  @ApiOperation({ description: 'Get one product' })
  @ApiBadRequestResponse({ description: 'No product found with this id' })
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOneProduct(id);
  }
  @ApiOperation({ description: 'Post one product' })
  @Post()
  async postOne(@Body() name: productDto) {
    return this.productService.postProduct(name);
  }
  @ApiBadRequestResponse({ description: 'No product found with this id' })
  @ApiOperation({ description: 'Update one product' })
  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateProductDto,
  ) {
    console.log(body);
    return this.productService.updateProduct(id, body);
  }
  @ApiBadRequestResponse({ description: 'No product found with this id' })
  @ApiOperation({ description: 'Delete one product' })
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
  @ApiBadRequestResponse({ description: 'No product found with this id' })
  @ApiOperation({ description: 'Get all containers where product id' })
  @Get('container/:id')
  async containerByproductId(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findContainersWhereProductId(id);
  }
  @ApiBadRequestResponse({ description: 'No product found with this id' })
  @ApiOperation({ description: 'Get all orders where product id' })
  @Get('findorder/:id')
  async orderByproductId(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOrdersWhereProductId(id);
  }
}
