import { PartialType } from '@nestjs/swagger';
import { CreateInstructorDto } from './create-instructor.dto';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {}
