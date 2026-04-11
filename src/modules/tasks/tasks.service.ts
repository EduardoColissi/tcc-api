import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: [{ status: 'asc' }, { position: 'asc' }, { priority: 'desc' }],
    });
  }

  async findToday(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.prisma.task.findMany({
      where: {
        userId,
        dueDate: { gte: today, lt: tomorrow },
      },
      orderBy: [{ priority: 'desc' }, { type: 'asc' }],
    });
  }

  create(userId: number, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        type: dto.type,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        position: dto.position ?? 0,
      },
    });
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto) {
    const task = await this.findTaskOrFail(userId, taskId);

    return this.prisma.task.update({
      where: { id: task.id },
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
    });
  }

  async move(userId: number, taskId: number, dto: MoveTaskDto) {
    const task = await this.findTaskOrFail(userId, taskId);

    return this.prisma.task.update({
      where: { id: task.id },
      data: { status: dto.status, position: dto.position },
    });
  }

  async remove(userId: number, taskId: number) {
    const task = await this.findTaskOrFail(userId, taskId);
    await this.prisma.task.delete({ where: { id: task.id } });
    return { message: 'Tarefa removida.' };
  }

  private async findTaskOrFail(userId: number, taskId: number) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Tarefa não encontrada.');
    if (task.userId !== userId) throw new ForbiddenException();
    return task;
  }
}
