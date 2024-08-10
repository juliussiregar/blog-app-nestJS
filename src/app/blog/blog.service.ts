import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dtos/create.dto';
import { UpdateBlogDto } from './dtos/update.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private BlogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = new this.BlogModel(createBlogDto);

    return await blog.save();
  }

  async update(updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return await this.BlogModel.findOneAndUpdate(
      { _id: updateBlogDto._id },
      updateBlogDto.clientProps,
      { new: true },
    );
  }

  async getOne(id: string): Promise<Blog> {
    return await this.BlogModel.findOne({ _id: id });
  }

  async getAll(): Promise<Blog[]> {
    return await this.BlogModel.find({});
  }

  async deleteOne(id: string) {
    return await this.BlogModel.findOneAndRemove({ _id: id });
  }
}
