import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/user.schema';
import { Model } from 'mongoose';
import { HashService } from 'src/hash/hash.service';
import { Instructor, InstructorDocument } from 'src/models/instructor.schema';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashService: HashService,

    @InjectModel(Instructor.name)
    private instructorModel: Model<InstructorDocument>,  ) {
    this.logger = new Logger(UserService.name);
  }

  async registerUser(RegisterUserDto: RegisterUserDto) {

    // check if user exists
    const user1 = await this.findByRoll(RegisterUserDto.roll);

    if (user1) {
      throw new BadRequestException(
        `user with #${RegisterUserDto.roll} already found`,
      );
    }

    // check if user exists
    const user = await this.findByEmail(RegisterUserDto.email);

    if (user) {
      throw new BadRequestException(
        `user with #${RegisterUserDto.email} already found`,
      );
    }
    
    const existinginst = await this.instructorModel.findOne({email:RegisterUserDto.email});
    if (existinginst) {
      throw new BadRequestException(
        `Instructor with #${RegisterUserDto.email} already found`,
      );
    }

    
    const createUser = new this.userModel(RegisterUserDto);
    console.log(createUser)
    // Hash Password
    createUser.password = await this.hashService.hashPassword(
      createUser.password,
    );

    await createUser.save();
    return {
      message: "user created successfully",
      status: HttpStatus.CREATED,
      data: {
        id: createUser._id,
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    const existinguser = await this.userModel
      .findOne({
        email: createUserDto.email,
      })
      .exec();
    if (existinguser) {
      this.logger.error(`user with #${createUserDto.email} already found`);
      throw new BadRequestException(
        `user with #${createUserDto.email} already found`,
      );
    }
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      this.logger.error(`users data not found!`);
      throw new NotFoundException('users data not found!');
    }
    return userData;
  }

  async findByEmail(email: string) {
    const existinguser = await this.userModel.findOne({email});
    if (!existinguser) {
      this.logger.error(`user #${email} not found`);
      return null;
    }

    return existinguser;
  }

  async getPassByEmail(email: string) {
    const existinguser = await this.userModel.findOne({email}).select("+password");
    if (!existinguser) {
      this.logger.error(`user #${email} not found`);
      return null;
    }
    return existinguser;
  }

  async findByRoll(roll: string) {
    const existinguser = await this.userModel.findOne({ roll });
    if (!existinguser) {
      this.logger.error(`user #${roll} not found`);

      return null;
    }
    return existinguser;
  }

  async getPassByRoll(roll: string) {
    const existinguser = await this.userModel.findOne({ roll }).select("+password");
    if (!existinguser) {
      this.logger.error(`user #${roll} not found`);

      return null;
    }
    return existinguser;
  }

  async findOne(id: string) {
    const existinguser = await this.userModel.findById(id);
    if (!existinguser) {
      this.logger.error(`user #${id} not found`);

      throw new NotFoundException(`user #${id} not found`);
    }
    return existinguser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existinguser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!existinguser) {
      this.logger.error(`user #${id} not found`);

      throw new NotFoundException(`user #${id} not found`);
    }
    return existinguser;
  }

  async remove(id: string) {
    const deleteduser = await this.userModel.findByIdAndDelete(id);
    if (!deleteduser) {
      this.logger.error(`user #${id} not found`);
      throw new NotFoundException(`user #${id} not found`);
    }
    return deleteduser;
  }
}
