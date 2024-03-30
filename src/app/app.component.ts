import { Component, OnInit, inject } from '@angular/core';
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
export class AppComponent implements OnInit {
  fb = inject(FormBuilder);

  title = 'todo-app';
  tasks: Itask[] = [];

  form = this.fb.nonNullable.group({
    todoInput: '',
  });

  ngOnInit(): void {
    const tasks: string | null = localStorage.getItem('tasks');
    this.tasks = tasks ? JSON.parse(tasks) : [];
  }

  addTodo(): void {
    const task = this.form.getRawValue().todoInput;
    const _id: string = Math.random().toString(16).substring(2);

    if (!task) return;

    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks.push({ _id: _id, isChecked: false, value: task });

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.form.reset();
  }

  editTask(id: string, text: string): void {}

  deleteTask(id: string): void {
    if (!this.tasks) return;
    const index = this.tasks.findIndex((t) => t._id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  checkedTask(id: string): void {
    if (!this.tasks) return;
    this.tasks.forEach((t) => {
      if (t._id === id) t.isChecked = !t.isChecked;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
