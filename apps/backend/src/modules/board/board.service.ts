import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBoardDto: CreateBoardDto) {
    return this.prisma.board.create({
      data: createBoardDto,
    });
  }

  findOne(id: string) {
    return this.prisma.board.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateBoardDto: CreateBoardDto) {
    return this.prisma.board.update({
      where: {
        id,
      },
      data: updateBoardDto,
    });
  }

  delete(id: string) {
    return this.prisma.board.delete({
      where: {
        id,
      },
    });
  }
}
