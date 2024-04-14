import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSubQuestionDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  powerReference?: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  correctAnswer?: string;
}
