import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import type { User } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateFocusEventsDto } from './dto/create-focus-event.dto';
import { CreateSessionDto } from './dto/create-session.dto';
import { EndSessionDto } from './dto/end-session.dto';
import { PomodoroService } from './pomodoro.service';

@Controller('pomodoro')
export class PomodoroController {
  constructor(private pomodoro: PomodoroService) {}

  @Post('sessions')
  createSession(@CurrentUser() user: User, @Body() dto: CreateSessionDto) {
    return this.pomodoro.createSession(user.id, dto);
  }

  @Put('sessions/:id/end')
  endSession(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EndSessionDto,
  ) {
    return this.pomodoro.endSession(user.id, id, dto);
  }

  @Get('sessions/active')
  getActiveSession(@CurrentUser() user: User) {
    return this.pomodoro.getActiveSession(user.id);
  }

  @Get('sessions')
  getSessions(
    @CurrentUser() user: User,
    @Query('taskId', new ParseIntPipe({ optional: true })) taskId?: number,
  ) {
    return this.pomodoro.getSessions(user.id, taskId);
  }

  @Get('stats')
  getStats(
    @CurrentUser() user: User,
    @Query('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.pomodoro.getStats(user.id, taskId);
  }

  @Get('history')
  getFocusHistory(@CurrentUser() user: User) {
    return this.pomodoro.getFocusHistory(user.id);
  }

  @Post('sessions/:id/focus-events')
  logFocusEvents(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateFocusEventsDto,
  ) {
    return this.pomodoro.logFocusEvents(user.id, id, dto);
  }

  @Get('sessions/:id/focus-summary')
  getFocusSummary(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.pomodoro.getSessionFocusSummary(user.id, id);
  }
}
