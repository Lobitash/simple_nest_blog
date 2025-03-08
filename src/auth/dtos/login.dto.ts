import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'user Email ' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456Aa', description: 'user Password' })
  @IsString()
  @MinLength(6)
  password: string;
}
