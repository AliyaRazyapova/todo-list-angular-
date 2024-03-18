import { Injectable } from '@angular/core';
import { Task } from "../app/shared/models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  tasks: Task[] = [];
  initialized: boolean = false;

  constructor() {
  }

  /**
   * Load tasks from json file
   */
  init() {
    if (this.initialized) {
      console.log('Already initialized');
      return;
    }
    console.log('Loading data from json file');

    // Загрузка данных из JSON файла внутри метода init()
    // @ts-ignore
    import("../assets/todo-list.json").then((todoList) => {
      if (todoList && todoList.init_tasks) {
        const init_tasks = todoList.init_tasks;
        init_tasks.forEach((taskData: any) => {
          this.tasks.push(new Task(taskData.title, taskData.note, taskData.id));
        });
      } else {
        console.error('Ошибка: todo-list.json не содержит ожидаемый ключ "init_tasks"');
      }
    }).catch(error => {
      console.error('Ошибка загрузки данных из todo-list.json:', error);
    });

    this.initialized = true;
  }

  /**
   * Returns all tasks
   */
  getTasks(): Task[] {
    this.init();
    return this.tasks;
  }

  /**
   * Remove the tasks from the list
   *
   * @param index task index to remove
   */
  delete(id: number) {
    let remaining_tasks: Task[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      var current_task = this.tasks[i];

      // we found the task to remove, we do not include it in our new array
      if (id == current_task.id) {
        console.log('Skipping tash[' + current_task.title + ']');
        continue;
      }

      remaining_tasks.push(this.tasks[i]);
    }
    this.tasks = remaining_tasks;
    return true;
  }

  /**
   * Return the task based in the given id
   *
   * @param id
   */
  get(id: number): Task | undefined {
    this.init();

    for (let i = 0; i < this.tasks.length; i++) {
        let task = this.tasks[i];
        // Если найдена задача с заданным id, возвращаем её
        if (task.id === id) {
            return task;
        }
    }

    // Если задача с заданным id не найдена, возвращаем undefined
    return undefined;
  }

  /**
   * Create a new task based on the given data (+ generate a new id)
   * @param title
   * @param note
   */
  add(title: string, note: string) {
    let task = new Task(title, note, this.getHighestId() + 1);
    this.tasks.push(task);
  }

  /**
   * Update the task and return it
   *
   * @param id
   * @param title
   * @param note
   *
   * @return Task
   */
  update(id: number, title: string, note: string): Task | undefined {
    let task = this.get(id);

    // Проверяем, существует ли объект task
    if (task) {
        task.title = title;
        task.note = note;
        return task;
    } else {
        // Если задача не найдена, возвращаем undefined
        return undefined;
    }
  }

  /**
   * Load tasks from json file
   */
  // init() {
  //   if (this.initialized) {
  //     console.log('Already initialized');
  //     return;
  //   }
  //   console.log('Loading data from json file');
  //
  //   for (let i = 0; i < init_tasks.length; i++) {
  //     this.tasks.push(
  //       new Task(
  //         init_tasks[i]['title'],
  //         init_tasks[i]['note'],
  //         init_tasks[i]['id'])
  //     );
  //   }
  //
  //   this.initialized = true;
  // }

  /**
   * Returns highest task id from our list.
   */
  getHighestId(): number {
    this.init(); // Убедитесь, что данные загружены перед вычислением
    return this.tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0);
  }
}
