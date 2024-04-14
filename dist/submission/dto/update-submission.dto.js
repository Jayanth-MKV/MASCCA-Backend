"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubmissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_submission_dto_1 = require("./create-submission.dto");
class UpdateSubmissionDto extends (0, swagger_1.PartialType)(create_submission_dto_1.CreateSubmissionDto) {
}
exports.UpdateSubmissionDto = UpdateSubmissionDto;
//# sourceMappingURL=update-submission.dto.js.map