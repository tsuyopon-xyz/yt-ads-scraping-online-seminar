import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

// NestJSが用意しているサンプルコードと同じように
// TasksModuleをimportsする形の実装にした。
// https://github.com/nestjs/nest/blob/master/sample/27-scheduling/src/app.module.ts
@Module({
  imports: [ScheduleModule.forRoot(), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
