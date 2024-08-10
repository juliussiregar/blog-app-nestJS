import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(email: string) {
    const user = new this.userModel({ email });

    const savedUser = await user.save();

    return {
      jwt_token: this.jwtService.sign({
        userId: savedUser._id.toString(),
        email: savedUser.email,
      }),
    };
  }
}
