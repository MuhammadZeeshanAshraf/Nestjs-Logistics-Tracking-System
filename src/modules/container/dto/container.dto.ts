import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';

export class containerDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]{3}-\d{3}$/, {
    message: 'Container number must be valid format AAA-NNN',
  })
  containerNumber: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
  @IsString()
  @IsNotEmpty()
  vendor: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  productId: number;
}
