import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from 'generated/prisma/enums';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const lastTask = await this.prisma.task.findFirst({
      where: {
        boardId: createTaskDto.boardId,
        status: createTaskDto.status,
      },
      orderBy: {
        position: 'desc',
      },
    });

    const position = lastTask ? lastTask.position + 1000 : 1000;

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        position,
      },
    });
  }

  async findAll(boardId: string, status: TaskStatus, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [tasks, total] = await this.prisma.$transaction([
      this.prisma.task.findMany({
        where: { boardId, status },
        orderBy: { position: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.task.count({
        where: { boardId, status },
      }),
    ]);

    return {
      items: tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      data: updateTaskDto,
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  move(id: string, moveTaskDto: MoveTaskDto) {
    const { targetStatus, prevTaskId, nextTaskId } = moveTaskDto;

    return this.prisma.$transaction(async (tx) => {
      const prevTask = prevTaskId
        ? await tx.task.findUnique({ where: { id: prevTaskId } })
        : null;

      const nextTask = nextTaskId
        ? await tx.task.findUnique({ where: { id: nextTaskId } })
        : null;

      let position: number;

      if (!prevTask && !nextTask) {
        position = 1000;
      } else if (!prevTask && nextTask) {
        position = nextTask.position - 1000;
      } else if (prevTask && !nextTask) {
        position = prevTask.position + 1000;
      } else {
        position = (prevTask!.position + nextTask!.position) / 2;
      }

      return tx.task.update({
        where: { id },
        data: {
          status: targetStatus,
          position,
        },
      });
    });
  }
}
