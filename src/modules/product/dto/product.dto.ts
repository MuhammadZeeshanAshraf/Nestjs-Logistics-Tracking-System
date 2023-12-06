import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { REGIONS } from '../../../common/constant/index';

export class productDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(REGIONS, { each: true })
  region: REGIONS = REGIONS.ASIA;
}
