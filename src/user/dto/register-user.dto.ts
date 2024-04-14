import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Gender {
  MALE,
  FEMALE,
}

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  readonly roll: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly department: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
