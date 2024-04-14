"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInstructorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_instructor_dto_1 = require("./create-instructor.dto");
class UpdateInstructorDto extends (0, swagger_1.PartialType)(create_instructor_dto_1.CreateInstructorDto) {
}
exports.UpdateInstructorDto = UpdateInstructorDto;
//# sourceMappingURL=update-instructor.dto.js.map