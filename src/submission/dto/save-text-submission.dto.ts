import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SaveTextSubmissionDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    answer: string;

    @IsString()
    @ApiProperty()
    index: string;

    @IsString()
    @ApiProperty()
    type: string;

    @IsString()
    @ApiProperty()
    time: string;
}

export class SaveAudioSubmissionDto {
    @IsString()
    @ApiProperty()
    id: string;
    
    @IsString()
    @ApiProperty()
    audiofile:string;

    @IsString()
    @ApiProperty()
    audiotext:string;

    @IsString()
    @ApiProperty()
    index: string;

    @IsString()
    @ApiProperty()
    type: string;
}