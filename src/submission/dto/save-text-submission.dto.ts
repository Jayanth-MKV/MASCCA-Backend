import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SaveTextSubmissionDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    answer: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    index: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    type: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    time: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    emotion: string;
}

export class SaveAudioSubmissionDto {
    @IsString()
    @ApiProperty()
    id: string;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    audiofile:string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    audiotext:string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    index: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    type: string;
}


export class SaveAudioTranscriptSubmissionDto {
    @IsString()
    @ApiProperty()
    id: string;
    
    @IsString()
    @ApiProperty()
    @IsOptional()
    audiotext:string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    index: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    type: string;
}