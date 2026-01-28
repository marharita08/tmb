import { Module } from '@nestjs/common';
import { BoardModule } from './modules/board/board.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [BoardModule, TaskModule],
})
export class AppModule {}
