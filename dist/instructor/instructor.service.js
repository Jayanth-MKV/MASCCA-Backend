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
var InstructorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const instructor_schema_1 = require("../models/instructor.schema");
const hash_service_1 = require("../hash/hash.service");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
let InstructorService = InstructorService_1 = class InstructorService {
    constructor(instructorModel, hashService, userService) {
        this.instructorModel = instructorModel;
        this.hashService = hashService;
        this.userService = userService;
        this.logger = new common_1.Logger(InstructorService_1.name);
    }
    async sendInviteEmail(data) {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        try {
            const resp = await fetch(`${process.env.EMAIL_SERVICE_ENDPOINT}/send-email`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: headersList
            });
            const job = await resp.json();
            return job;
        }
        catch (e) {
            throw new common_1.BadGatewayException("email server is down");
        }
    }
    async sendMultipleInviteEmails(data) {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        try {
            const resp = await fetch(`${process.env.EMAIL_SERVICE_ENDPOINT}/send-multiple-emails`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: headersList
            });
            const job = await resp.json();
            return job;
        }
        catch (e) {
            throw new common_1.BadGatewayException("email server is down");
        }
    }
    async registerInstructor(CreateCreateInstructorDto) {
        const Instructor = await this.findByEmail(CreateCreateInstructorDto.email);
        const user = await this.userService.findByEmail(CreateCreateInstructorDto.email);
        if (user) {
            throw new common_1.BadRequestException(`User with #${CreateCreateInstructorDto.email} already found`);
        }
        if (Instructor) {
            throw new common_1.BadRequestException(`Instructor with #${CreateCreateInstructorDto.email} already found`);
        }
        const createInstructor = new this.instructorModel(CreateCreateInstructorDto);
        console.log(createInstructor);
        createInstructor.password = await this.hashService.hashPassword(createInstructor.password);
        const us = await createInstructor.save();
        return {
            message: 'Instructor created successfully',
            status: common_1.HttpStatus.CREATED,
            user: {
                email: createInstructor.email,
                id: us?._id
            },
        };
    }
    async create(createinstructorDto) {
        const existinginstructor = await this.instructorModel
            .findOne({
            email: createinstructorDto.email,
        })
            .exec();
        if (existinginstructor) {
            this.logger.error(`instructor with #${createinstructorDto.email} already found`);
            throw new common_1.BadRequestException(`instructor with #${createinstructorDto.email} already found`);
        }
        const instructor = await this.instructorModel.create(createinstructorDto);
        return instructor;
    }
    async findAll() {
        const instructorData = await this.instructorModel.find();
        if (!instructorData || instructorData.length == 0) {
            this.logger.error(`instructors data not found!`);
            throw new common_1.NotFoundException('instructors data not found!');
        }
        return instructorData;
    }
    async findByEmail(email) {
        const existinginstructor = await this.instructorModel.findOne({ email });
        if (!existinginstructor) {
            this.logger.error(`instructor #${email} not found`);
            return null;
        }
        return existinginstructor;
    }
    async getPassByEmail(email) {
        const existinginstructor = await this.instructorModel
            .findOne({ email })
            .select('+password').select("+type");
        if (!existinginstructor) {
            this.logger.error(`instructor #${email} not found`);
            return null;
        }
        if (existinginstructor.type != "CRED") {
            this.logger.error(`instructor #${existinginstructor.type} login cannot login via cred`);
            return null;
        }
        return existinginstructor;
    }
    async findByDepartment(department) {
        const existinginstructor = await this.instructorModel.findOne({ department });
        if (!existinginstructor) {
            this.logger.error(`instructor #${department} not found`);
            return null;
        }
        return existinginstructor;
    }
    async findOne(id) {
        const existinginstructor = await this.instructorModel.findById(id);
        if (!existinginstructor) {
            this.logger.error(`instructor #${id} not found`);
            throw new common_1.NotFoundException(`instructor #${id} not found`);
        }
        return existinginstructor;
    }
    async update(id, updateinstructorDto) {
        const existinginstructor = await this.instructorModel.findByIdAndUpdate(id, updateinstructorDto, { new: true });
        if (!existinginstructor) {
            this.logger.error(`instructor #${id} not found`);
            throw new common_1.NotFoundException(`instructor #${id} not found`);
        }
        return existinginstructor;
    }
    async remove(id) {
        const deletedinstructor = await this.instructorModel.findByIdAndDelete(id);
        if (!deletedinstructor) {
            this.logger.error(`instructor #${id} not found`);
            throw new common_1.NotFoundException(`instructor #${id} not found`);
        }
        return deletedinstructor;
    }
};
exports.InstructorService = InstructorService;
exports.InstructorService = InstructorService = InstructorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        hash_service_1.HashService,
        user_service_1.UserService])
], InstructorService);
//# sourceMappingURL=instructor.service.js.map