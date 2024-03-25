import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
//   IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// enum Role {
//   STUDENT,
//   INSTRUCTOR,
// }

export class sLoginDto {

  // @ApiProperty()
  // @IsEnum(Role)
  // @IsNotEmpty()
  // readonly role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(10)
  readonly roll: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class iLoginDto {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
