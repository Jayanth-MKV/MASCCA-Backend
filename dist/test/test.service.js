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
var TestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const instructor_service_1 = require("../instructor/instructor.service");
const common_1 = require("@nestjs/common");
const test_schema_1 = require("../models/test.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const random_token_1 = require("../utils/random-token");
const helpers_1 = require("../utils/helpers");
let TestService = TestService_1 = class TestService {
    constructor(testModel, instructorService) {
        this.testModel = testModel;
        this.instructorService = instructorService;
        this.logger = new common_1.Logger(TestService_1.name);
    }
    async createInviteLink(testId) {
        const test = await this.testModel.findById(testId);
        return `/test-redirect/${test._id}/${test.title}/${test.testSecret}/`;
    }
    async getByIdAndSecret(id, testSecret) {
        const allFields = await (0, helpers_1.getTestFields)(this.testModel);
        const existingtest = await this.testModel.findOne({ _id: id, testSecret });
        if (!existingtest) {
            this.logger.error(`test #${id} not found`);
            throw new common_1.NotFoundException(`test #${id} not found`);
        }
        const user = await this.instructorService.findOne(existingtest.createdBy);
        const testR = await (0, helpers_1.objectParser)(existingtest, allFields);
        testR["createdBy"] = user.name;
        return testR;
    }
    async create(createTestDto, id) {
        const testSecret = await (0, random_token_1.generateRandomToken)();
        return await this.testModel.create({
            title: createTestDto.title,
            about: createTestDto.about,
            keywords: createTestDto.keywords,
            createdBy: id,
            testSecret,
        });
    }
    async findAll(id) {
        try {
            const testData = await this.testModel.find({
                createdBy: id,
            });
            if (!testData || testData.length == 0) {
                this.logger.error(`tests data not found!`);
                throw new common_1.NotFoundException('tests data not found!');
            }
            return testData;
        }
        catch (e) {
            throw new common_1.NotFoundException('tests data not found!');
        }
    }
    async findAllAvailable() {
        try {
            const testData = await this.testModel.find({
                published: true,
            }).select(["title", "_id", "keywords"]);
            console.log(testData);
            if (!testData || testData.length == 0) {
                this.logger.error(`tests not found!`);
                throw new common_1.NotFoundException('tests not found!');
            }
            return testData;
        }
        catch (e) {
            throw new common_1.NotFoundException('tests not found!');
        }
    }
    async findAllOng(id) {
        try {
            const testData = await this.testModel.find({
                createdBy: id,
                published: true,
            });
            if (!testData) {
                this.logger.error(`tests data not found!`);
                throw new common_1.NotFoundException('tests data not found!');
            }
            return testData;
        }
        catch (e) {
            throw new common_1.NotFoundException('tests data not found!');
        }
    }
    async findOneU(id) {
        const allFields = await (0, helpers_1.getTestFields)(this.testModel);
        const existingtest = await this.testModel.findById(id);
        if (!existingtest) {
            this.logger.error(`test #${id} not found`);
            throw new common_1.NotFoundException(`test #${id} not found`);
        }
        const user = await this.instructorService.findOne(existingtest.createdBy);
        const testR = await (0, helpers_1.objectParser)(existingtest, allFields);
        testR["createdBy"] = user.name;
        return testR;
    }
    async findOneI(id, uid) {
        const existingtest = await this.testModel.findById(id);
        const allFields = await (0, helpers_1.getTestFields)(this.testModel);
        if (existingtest.createdBy != uid) {
            this.logger.error(`cannot access test`);
            throw new common_1.NotFoundException(`cannot access test #${id} - not found`);
        }
        if (!existingtest) {
            this.logger.error(`test #${id} not found`);
            throw new common_1.NotFoundException(`test #${id} not found`);
        }
        const testR = await (0, helpers_1.objectParser)(existingtest, allFields);
        return testR;
    }
    async update(id, updateTestDto) {
        const existingtest = await this.testModel.findByIdAndUpdate(id, updateTestDto);
        if (!existingtest) {
            this.logger.error(`test #${id} not found`);
            throw new common_1.NotFoundException(`test #${id} not found`);
        }
        return existingtest;
    }
    async publishTest(id, updatePubDto) {
        console.log({ id, ...updatePubDto });
        const existingtest = await this.testModel.findByIdAndUpdate(id, updatePubDto);
        if (!existingtest) {
            this.logger.error(`test #${id} not found`);
            throw new common_1.NotFoundException(`test #${id} not found`);
        }
        return existingtest;
    }
    async remove(id) {
        const deletedtest = await this.testModel.findByIdAndDelete(id);
        if (!deletedtest) {
            this.logger.error(`test #${id} not found`);
            throw new common_1.NotFoundException(`test #${id} not found`);
        }
        return deletedtest;
    }
};
exports.TestService = TestService;
exports.TestService = TestService = TestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(test_schema_1.Test.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        instructor_service_1.InstructorService])
], TestService);
//# sourceMappingURL=test.service.js.map