import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Environment {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;
  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;
  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;
  @IsNumber()
  @IsNotEmpty()
  DB_PORT: number;
  @IsString()
  @IsNotEmpty()
  DB_CONNECTION_NAME: string;
  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  @IsNotEmpty()
  ENVIRONMENT: string;
}
