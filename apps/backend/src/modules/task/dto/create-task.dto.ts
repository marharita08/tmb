import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  @IsNotEmpty()
  boardId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
