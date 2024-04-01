import { ApiProperty } from "@nestjs/swagger";

export class StorageObjectDto {

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

  @ApiProperty({ type: 'string', required: true })
  text: string;
}
