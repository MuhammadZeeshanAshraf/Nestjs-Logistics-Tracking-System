import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateSaleAgentDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
