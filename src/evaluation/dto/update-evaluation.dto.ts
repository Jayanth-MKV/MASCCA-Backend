import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class UpdateEvaluationDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    question_confidence: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    correctAnswer: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty()
    audioEmotion: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    videoEmotion: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    audiotextRelevancy: number;

    @IsOptional()
    @IsString()
    @ApiProperty()
    time: string;
}
