import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from '../shared/components/task/task.component';
import { Itask } from '../shared/components/task/types/task.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('addRemoveAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-300%)' }),
        animate(
          '300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 0, transform: 'translateY(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  fb = inject(FormBuilder);

  title = 'todo-app';
  tasks = signal<Itask[]>([]);

  form = this.fb.nonNullable.group({
    todoInput: '',
  });

  saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  loadTasksFromLocalStorage(): void {
    const tasks: string | null = localStorage.getItem('tasks');
    this.tasks.update((taskss) => (taskss = tasks ? JSON.parse(tasks) : []));
  }

  getTaskIndex(id: string): number {
    let index!: number;
    this.tasks().find((t: Itask, i: number) => {
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

    this.tasks.update(
      (tasks) => (tasks = JSON.parse(localStorage.getItem('tasks') || '[]'))
    );
    this.tasks.update((tasks) => [
      ...tasks,
      { _id: _id, isChecked: false, value: task },
    ]);

    this.saveTasksToLocalStorage();
    this.form.reset();
  }

  editTask(editedTask: Itask): void {
    const index = this.getTaskIndex(editedTask._id);

    if (index !== -1) {
      this.tasks()[index].value = editedTask.value;
      this.saveTasksToLocalStorage();
    }
  }

  deleteTask(id: string): void {
    if (!this.tasks()) return;

    const index = this.getTaskIndex(id);
    if (index !== -1) {
      this.tasks.update((tasks) => tasks.filter((v) => v._id !== id));
      this.saveTasksToLocalStorage();
    }
  }

  checkedTask(id: string): void {
    if (!this.tasks()) return;

    const index = this.getTaskIndex(id);

    this.tasks()[index].isChecked = !this.tasks()[index].isChecked;
    this.saveTasksToLocalStorage();
  }
}
