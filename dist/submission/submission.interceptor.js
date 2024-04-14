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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const submission_service_1 = require("./submission.service");
let SubmissionInterceptor = class SubmissionInterceptor {
    constructor(submissionService) {
        this.submissionService = submissionService;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const id = req.body?.id || req.params?.id;
        if (!id) {
            throw new common_1.BadRequestException('ID is missing in request');
        }
        try {
            const submission = await this.submissionService.findOne(id);
            if (submission.submitted) {
                return (0, rxjs_1.of)({ error: 'Submission is no longer accessible' });
            }
            else {
                return next.handle();
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid submission ID');
        }
    }
};
exports.SubmissionInterceptor = SubmissionInterceptor;
exports.SubmissionInterceptor = SubmissionInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submission_service_1.SubmissionService])
], SubmissionInterceptor);
//# sourceMappingURL=submission.interceptor.js.map