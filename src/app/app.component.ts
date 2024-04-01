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
  newValue!: string;
  isEditMode!: boolean;

  form = this.fb.nonNullable.group({
    todoInput: '',
  });

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasksFromLocalStorage(): void {
    const tasks: string | null = localStorage.getItem('tasks');
    this.tasks = tasks ? JSON.parse(tasks) : [];
  }

  getTaskIndex(id: string): number {
    let index!: number;
    this.tasks.find((t: Itask, i: number) => {
      if (t._id === id) index = i;
    });
    return index;
  }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }

  addTodo(): void {
    const task = this.form.getRawValue().todoInput;
    const _id: string = Math.random().toString(16).substring(2);

    if (!task) return;

    this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks.push({ _id: _id, isChecked: false, value: task });

    this.saveTasksToLocalStorage();
    this.form.reset();
  }

  editTask(editedTask: Itask): void {
    const index = this.getTaskIndex(editedTask._id);

    if (index !== -1) {
      this.tasks[index].value = editedTask.value;
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(id: string): void {
    if (!this.tasks) return;

    const index = this.getTaskIndex(id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
    }
  }

  checkedTask(id: string): void {
    if (!this.tasks) return;

    const index = this.getTaskIndex(id);

    this.tasks[index].isChecked = !this.tasks[index].isChecked;
    this.saveTasksToLocalStorage();
  }
}
