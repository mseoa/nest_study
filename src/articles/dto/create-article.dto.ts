import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  minLength,
} from 'class-validator';

export class CreateArticleDto {
  // Data Transfer Object
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty() // nestjs가 제공하는 swagger decorator, swagger가 자동으로 문서화해줌
  title: string;
  
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;
  
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  published?: boolean = false; //default value is false
}
