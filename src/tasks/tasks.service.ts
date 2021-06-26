import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let filtered_tasks = this.getAllTasks();

    if (status) {
      filtered_tasks = filtered_tasks.filter((t) => t.status === status);
    }

    if (search) {
      filtered_tasks = filtered_tasks.filter(
        (t) => t.title.includes(search) || t.description.includes(search),
      );
    }

    return filtered_tasks;
  }

  getTaskById(id: string): Task {
    const target_task = this.tasks.find((t) => t.id === id);
    if (!target_task) {
      throw new NotFoundException(`Task with Id ${id} is not found.`);
    }

    return target_task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const target_task = this.getTaskById(id);
    this.tasks = this.tasks.filter((t) => t.id !== target_task.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const target_task = this.getTaskById(id);
    target_task.status = status;
    return target_task;
  }
}
