import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { REGIONS } from '../../../common/constant/index';

export class updateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(REGIONS, { each: true })
  region?: REGIONS = REGIONS.ASIA;
}
