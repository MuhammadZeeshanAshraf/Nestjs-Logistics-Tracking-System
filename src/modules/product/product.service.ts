import { Inject, Injectable } from '@nestjs/common';

import { ContainerService } from '../container/container.service';
import { productDto } from './dto/product.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { Product } from './entities/product.entity';
import { IProductRepository } from './repositories/interfaces/product.interface';
import { entityAssembler } from '../../utils/index';

@Injectable()
export class ProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(ContainerService) public containerService: ContainerService,
  ) {}

  //Base Rep use

  async getAllProducts() {
    return await this.productRepository.findAllItems();
  }
  async postProduct(body: productDto) {
    const product = new Product();

    const data: Product = await entityAssembler<Product, productDto>(
      body,
      product,
    );
    return await this.productRepository.postItem(data);
  }
  async deleteProduct(id: number) {
    await this.productRepository.getOneProduct(id);

    await this.containerService.deleteRelatedContainers(id);
    return await this.productRepository.deleteItem(id);
  }

  //Product Rep use

  async getOneProduct(id: number) {
    return this.productRepository.getOneProduct(id);
  }

  async updateProduct(id: number, body: updateProductDto) {
    return await this.productRepository.updateProduct(id, body);
  }

  async findContainersWhereProductId(id: number) {
    return await this.productRepository.findContainersWhereProductId(id);
  }
  async findOrdersWhereProductId(id: number) {
    return await this.productRepository.findOrdersWhereProductId(id);
  }
}
