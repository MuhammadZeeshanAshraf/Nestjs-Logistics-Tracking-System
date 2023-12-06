import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class updateContainerDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]{3}-\d{3}$/, {
    message: 'Container number must be valid format AAA-NNN',
  })
  containerNumber?: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsOptional()
  quantity?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  vendor?: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsOptional()
  productId?: number;
}
