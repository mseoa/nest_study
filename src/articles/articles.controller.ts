import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe, // intercept string param and parse to int
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles') // swagger : article api입니다 묶어줌
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(await this.articlesService.create(createArticleDto));
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article)=>new ArticleEntity(article))
  }

  @Get('drafts') // article/drafts
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAllDrafts() {
    const drafts = await this.articlesService.findAllDrafts();
    return drafts.map((draft) => new ArticleEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // 에러핸들링하기전에 async
    const article = await this.articlesService.findOne(id);

    if (!article) {
      throw new NotFoundException(`id가 ${id}인 article이 존재하지 않습니다.`);
    }

    return new ArticleEntity(article);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return new ArticleEntity(await this.articlesService.update(+id, updateArticleDto));
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
