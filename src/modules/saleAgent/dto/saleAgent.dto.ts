import { IsNotEmpty, IsString } from 'class-validator';

export class saleAgentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
