import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class updatedCustomerDto {
  @IsString()
  @IsNotEmpty()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+92\d{10}$/, { message: 'Number should be valid ' })
  mobile?: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^PK\d{2}[A-Z]{4}\d{16}$/, {
    message: 'Account number should be valid',
  })
  accountNumber?: string;
  @IsString()
  @IsNotEmpty()
  address?: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}(?:-)\d{7}(?:-)\d$/, {
    message: 'Identity must be valid pakistani identity',
  })
  identityNumber?: string;
}
