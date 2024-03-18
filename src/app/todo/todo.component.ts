import { Component, OnInit } from '@angular/core';
import { TaskStorageService } from "../task-storage.service";
import { Task } from "../shared/models/task.model";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Task[];

  constructor(private storage: TaskStorageService) {
    this.tasks = [];
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Load tasks
   */
  loadTasks(): void {
    this.tasks = this.storage.getTasks();
  }

  /**
   * Remove a task from the list
   * @param id Task id to remove
   */
  delete(id: number): void {
    this.storage.delete(id);
    this.loadTasks(); // Update the task list
  }
}
