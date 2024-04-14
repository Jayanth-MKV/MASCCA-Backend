import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class getAudioDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly filePath: string;   
}