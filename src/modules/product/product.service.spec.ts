import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { IProductRepository } from './repositories/interfaces/product.interface';
import { ContainerService } from '../container/container.service';
import { IContainerRepository } from '../container/repositories/interfaces/container.interface';
import { OrderService } from '../order/order.service';
import { IOrderRepository } from '../order/repositories/interface/order.interface';
import { REGIONS } from 'src/common/constant';
/**
//  * Test example for product service
 */
describe('ProductService', () => {
  let productService: ProductService;
  const postSentDto = {
    name: 'sufian',
    region: REGIONS.ASIA,
  };
  const postReturnedDto = {
    id: 1,
    ...postSentDto,
  };

  class mockProductRepository {
    async findAllItems() {
      return {
        id: 1,
        name: 'sufian',
        region: 'Asia',
      };
    }
  }
  class mockContainerRepository {}
  class mockOrderRepository {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: IProductRepository,
          useClass: mockProductRepository,
        },
        ContainerService,
        {
          provide: IContainerRepository,
          useClass: mockContainerRepository,
        },
        OrderService,
        {
          provide: IOrderRepository,
          useClass: mockOrderRepository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });
  it('Product service should be defined', () => {
    expect(productService).toBeDefined();
  });
  it('Should return all products', async () => {
    expect(await productService.getAllProducts()).toEqual({
      ...postReturnedDto,
    });
    expect(productService.getAllProducts()).toBeTruthy();
  });
});
