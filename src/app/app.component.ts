import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from '../shared/components/task/task.component';
import { Itask } from '../shared/components/task/types/task.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fb = inject(FormBuilder);

  title = 'todo-app';
  tasks: Itask[] = [];
  curr!: Itask | undefined;

  form = this.fb.nonNullable.group({
    todoInput: '',
  });

  addTodo(): void {
    const task = this.form.getRawValue().todoInput;
    const _id: string = Math.random().toString(16).substring(2);

    if (!task) return;

    this.tasks.push({ _id: _id, isChecked: false, value: task });
    this.form.reset();
    console.log(this.tasks);
  }

  editTask(id: string, text: string) {}

  deleteTask(id: string) {
    this.tasks.forEach((t, i, arr) => {
      if (t._id === id) arr.splice(i, 1);
    });
  }
  checkedTask(id: string) {
    if (!this.tasks) {
      return;
    } else {
      this.curr = this.tasks.find((t) => t._id === id);
    }
  }
}
