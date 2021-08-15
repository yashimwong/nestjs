import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
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

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID: ${id} not found.`);
    }
    return task;
  }

  deleteTaskById(id: string): void {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
