"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../models/user.schema");
const mongoose_2 = require("mongoose");
const hash_service_1 = require("../hash/hash.service");
const instructor_schema_1 = require("../models/instructor.schema");
let UserService = UserService_1 = class UserService {
    constructor(userModel, hashService, instructorModel) {
        this.userModel = userModel;
        this.hashService = hashService;
        this.instructorModel = instructorModel;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async registerUser(RegisterUserDto) {
        const user1 = await this.findByRoll(RegisterUserDto.roll);
        if (user1) {
            throw new common_1.BadRequestException(`user with #${RegisterUserDto.roll} already found`);
        }
        const user = await this.findByEmail(RegisterUserDto.email);
        if (user) {
            throw new common_1.BadRequestException(`user with #${RegisterUserDto.email} already found`);
        }
        const existinginst = await this.instructorModel.findOne({ email: RegisterUserDto.email });
        if (existinginst) {
            throw new common_1.BadRequestException(`Instructor with #${RegisterUserDto.email} already found`);
        }
        const createUser = new this.userModel(RegisterUserDto);
        console.log(createUser);
        createUser.password = await this.hashService.hashPassword(createUser.password);
        await createUser.save();
        return {
            message: "user created successfully",
            status: common_1.HttpStatus.CREATED,
            data: {
                id: createUser._id,
            }
        };
    }
    async create(createUserDto) {
        const existinguser = await this.userModel
            .findOne({
            email: createUserDto.email,
        })
            .exec();
        if (existinguser) {
            this.logger.error(`user with #${createUserDto.email} already found`);
            throw new common_1.BadRequestException(`user with #${createUserDto.email} already found`);
        }
        const user = await this.userModel.create(createUserDto);
        return user;
    }
    async findAll() {
        const userData = await this.userModel.find();
        if (!userData || userData.length == 0) {
            this.logger.error(`users data not found!`);
            throw new common_1.NotFoundException('users data not found!');
        }
        return userData;
    }
    async findByEmail(email) {
        const existinguser = await this.userModel.findOne({ email });
        if (!existinguser) {
            this.logger.error(`user #${email} not found`);
            return null;
        }
        return existinguser;
    }
    async getPassByEmail(email) {
        const existinguser = await this.userModel.findOne({ email }).select("+password");
        if (!existinguser) {
            this.logger.error(`user #${email} not found`);
            return null;
        }
        return existinguser;
    }
    async findByRoll(roll) {
        const existinguser = await this.userModel.findOne({ roll });
        if (!existinguser) {
            this.logger.error(`user #${roll} not found`);
            return null;
        }
        return existinguser;
    }
    async getPassByRoll(roll) {
        const existinguser = await this.userModel.findOne({ roll }).select("+password");
        if (!existinguser) {
            this.logger.error(`user #${roll} not found`);
            return null;
        }
        return existinguser;
    }
    async findOne(id) {
        const existinguser = await this.userModel.findById(id);
        if (!existinguser) {
            this.logger.error(`user #${id} not found`);
            throw new common_1.NotFoundException(`user #${id} not found`);
        }
        return existinguser;
    }
    async update(id, updateUserDto) {
        const existinguser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!existinguser) {
            this.logger.error(`user #${id} not found`);
            throw new common_1.NotFoundException(`user #${id} not found`);
        }
        return existinguser;
    }
    async remove(id) {
        const deleteduser = await this.userModel.findByIdAndDelete(id);
        if (!deleteduser) {
            this.logger.error(`user #${id} not found`);
            throw new common_1.NotFoundException(`user #${id} not found`);
        }
        return deleteduser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        hash_service_1.HashService,
        mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map