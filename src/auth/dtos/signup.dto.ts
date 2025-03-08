import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'user Email ' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456Aa', description: 'user Password' })
  @IsString()
  @MinLength(6)
  password: string;
}
