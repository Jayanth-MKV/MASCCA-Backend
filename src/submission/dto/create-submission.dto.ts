import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSubmissionDto {
    @IsString()
    @ApiProperty()
    testId: string;

    @IsString()
    @ApiProperty()
    userId: string;
}