import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class orderDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  containerId: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  customerId: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  saleAgentId: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  quantity: number;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  rate: number;
}
