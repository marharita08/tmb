import { Module } from '@nestjs/common';
import { BoardModule } from './modules/board/board.module';
import { TaskModule } from './modules/task/task.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
