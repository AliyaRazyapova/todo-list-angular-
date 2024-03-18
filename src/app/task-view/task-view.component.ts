import { Component, OnInit } from '@angular/core';
import { Task } from "../shared/models/task.model";
import { TaskStorageService } from "../task-storage.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  task: Task = new Task('', ''); // Инициализируем объект задачи

  constructor(private storage: TaskStorageService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!; // Преобразуем строку в число и добавляем восклицательный знак для указания на то, что значение не является null
      this.task = this.storage.get(id)!; // Добавляем восклицательный знак для указания на то, что значение не является undefined
    });
  }

  delete(id: number): void { // Указываем тип переменной id как number
    this.storage.delete(this.task.id);
    this.router.navigate(['/tasks']);
  }
}
