import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 20,
  ) {
    return this.boardService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: CreateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.boardService.delete(id);
  }
}
