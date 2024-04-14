import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEvaluationDto {
    @IsString()
    @ApiProperty()
    submissionId: string;

    @IsString()
    @ApiProperty()
    testId: string;

    @IsString()
    @ApiProperty()
    userId: string;
}


export class SaveTextEvaluationDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    correctAnswer: Number;

    @IsString()
    @ApiProperty()
    index: string;

    @IsString()
    @ApiProperty()
    type: string;

    @IsString()
    @ApiProperty()
    emotion: string;
}

export class SaveAudioEvaluationDto {
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


export class AudioReEvaluationDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    index: string;
}
export class TextReEvaluationDto {
    @IsString()
    @ApiProperty()
    id: string;

    @IsString()
    @ApiProperty()
    index: string;
}