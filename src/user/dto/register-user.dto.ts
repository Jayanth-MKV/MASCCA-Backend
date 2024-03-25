import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
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
  @IsEnum(Gender)
  @IsNotEmpty()
  readonly gender: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}
