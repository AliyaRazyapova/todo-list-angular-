import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from "../shared/models/task.model";
import { TaskStorageService } from "../task-storage.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  task: Task = new Task('', ''); // Инициализируем объект задачи
  id!: number; // Указываем тип переменной id как number и добавляем восклицательный знак для указания на то, что переменная будет определена позже

  title = new FormControl('');
  note = new FormControl('');

  constructor(private storage: TaskStorageService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!; // Преобразуем строку в число и добавляем восклицательный знак для указания на то, что значение не является null
      this.task = this.storage.get(this.id)!; // Добавляем восклицательный знак для указания на то, что значение не является undefined
      this.note.setValue(this.task.note);
      this.title.setValue(this.task.title);
    });
  }

  updateTask() {
    if (this.id !== null && this.title.value !== null && this.note.value !== null) {
      this.storage.update(this.id, this.title.value, this.note.value);
      this.router.navigate(['/tasks']);
    }
  }
}
