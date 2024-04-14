import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';



export class CreateInstructorDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly department: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
 
  @ApiProperty()
  @IsString()
  @IsOptional()
  type: string;
}

export class CreateInstructorDtoI {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly department: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;
}

export class EmailCheckDto{
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}