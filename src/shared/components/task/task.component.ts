import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Itask } from './types/task.interface';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true,
  imports: [FormsModule],
})
export class TaskComponent {
  @Input() todo!: Itask;
  @Output() checked = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<Itask>();
  @Output() delete = new EventEmitter<void>();
  editMode: boolean = false;

  editedValue!: string;

  checkTask(checked: boolean): void {
    this.checked.emit(checked);
  }

  deleteTask(): void {
    this.delete.emit();
  }

  editTask(): void {
    if (this.editMode) {
      this.todo.value = this.editedValue;
      this.edit.emit(this.todo);
    } else {
      this.editedValue = this.todo.value;
    }
    this.editMode = !this.editMode;
  }
}
