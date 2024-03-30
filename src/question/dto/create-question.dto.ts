import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @ApiProperty()
  testId: string;
}
