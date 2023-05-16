import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false, nullable: true })
  description: string | null;
  @ApiProperty()
  body: string;
  @ApiProperty()
  published: boolean;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date; // controller에서도 response specify해야함
}
