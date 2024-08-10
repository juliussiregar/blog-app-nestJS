import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dtos/create.dto';
import { UpdateBlogDto } from './dtos/update.dto';

@Controller('blog') // localhost:3000/blog
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CreateBlogDto, @Req() req) {
    try {
      return await this.blogService.create({
        ...body,
        userId: req.user?.userId,
      });
    } catch (err) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('update')
  async update(@Body() body: UpdateBlogDto) {
    return await this.blogService.update(body);
  }

  @Get('post/:id')
  async getOne(@Param('id') id: string) {
    return await this.blogService.getOne(id);
  }

  @Get('all')
  async getAll() {
    return await this.blogService.getAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.blogService.deleteOne(id);
  }
}
