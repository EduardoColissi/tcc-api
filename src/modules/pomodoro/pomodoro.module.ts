import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PomodoroController } from './pomodoro.controller';
import { PomodoroService } from './pomodoro.service';

@Module({
  imports: [PrismaModule],
  controllers: [PomodoroController],
  providers: [PomodoroService],
})
export class PomodoroModule {}
