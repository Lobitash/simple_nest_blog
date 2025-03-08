import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty( { example: 'My first blog', description: 'Title of the blog' } )
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the content of the blog', description: 'Blog content'})
  @IsString()
  @IsNotEmpty()
  content: string;
}
