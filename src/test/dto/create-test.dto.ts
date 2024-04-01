import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateTestDto {
  @IsString()
  @ApiProperty()
  title: string;
  
  @IsArray()
  @ApiProperty()
  keywords: string[];

}
