import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

import { orderDto } from './order.dto';

export class updateOrderDto implements Partial<orderDto> {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  containerId?: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  customerId?: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  saleAgentId?: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  quantity?: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  rate?: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  @IsOptional()
  total?: number;
}
