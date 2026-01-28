import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { TaskStatus } from 'generated/prisma/enums';

export class MoveTaskDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  targetStatus: TaskStatus;

  @IsUUID()
  @IsOptional()
  prevTaskId?: string;

  @IsUUID()
  @IsOptional()
  nextTaskId?: string;
}
