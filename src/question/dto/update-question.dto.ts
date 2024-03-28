import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @ApiProperty()
  topic: string;

  @IsString()
  @ApiProperty()
  content: string;
}
