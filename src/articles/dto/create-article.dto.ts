import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  // Data Transfer Object
  @ApiProperty() // nestjs가 제공하는 swagger decorator, swagger가 자동으로 문서화해줌
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ required: false })
  published?: boolean = false; //default value is false
}
