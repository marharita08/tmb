import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBoardDto: CreateBoardDto) {
    return this.prisma.board.create({
      data: createBoardDto,
    });
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [boards, total] = await this.prisma.$transaction([
      this.prisma.board.findMany({
        skip,
        take: limit,
      }),
      this.prisma.board.count(),
    ]);

    return {
      items: boards,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const board = await this.prisma.board.findUnique({
      where: {
        id,
      },
    });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  async update(id: string, updateBoardDto: CreateBoardDto) {
    await this.findOne(id);
    return this.prisma.board.update({
      where: {
        id,
      },
      data: updateBoardDto,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.board.delete({
      where: {
        id,
      },
    });
  }
}
