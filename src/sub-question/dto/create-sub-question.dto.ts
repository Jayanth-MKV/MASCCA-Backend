import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';


enum Type{
  AUDIO,
  TEXT
}

export class CreateSubQuestionDto {
  @IsString()
  @ApiProperty()
  testId: string;

  @IsString()
  @ApiProperty()
  createdBy: string;

  @IsString()
  @ApiProperty()
  @IsEnum(Type)
  type: string;
}
