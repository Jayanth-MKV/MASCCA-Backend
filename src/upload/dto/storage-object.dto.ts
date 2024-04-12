import { ApiProperty } from "@nestjs/swagger";

export class StorageObjectDto {
  @ApiProperty({ type: 'string', required: true })
  text: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;

}
