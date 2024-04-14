import { ApiProperty, PartialType } from '@nestjs/swagger';
// import { CreateTestDto } from './create-test.dto';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTestDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  instructions: string;

  @IsString()
  @ApiProperty()
  guidelines: string;

  @IsString()
  @ApiProperty()
  tandc: string;

  @IsNumber()
  @ApiProperty()
  durationMinutes: number;

  @IsDateString()
  @ApiProperty()
  startTime: Date;

  @IsDateString()
  @ApiProperty()
  endTime: Date;

  // @IsString()
  // @ApiProperty()
  // @IsOptional()
  // published: boolean;
}


export class updatePubDto{

   @IsBoolean()
   @ApiProperty()
  published: boolean;
}