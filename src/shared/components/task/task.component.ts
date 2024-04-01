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
  @Input() task!: Itask;
  @Output() checked = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<Itask>();
  @Output() delete = new EventEmitter<void>();

  editMode: boolean = false;
  editedTaskValue!: string;

  checkTask(checked: boolean): void {
    this.checked.emit(checked);
  }

  deleteTask(): void {
    this.delete.emit();
  }

  editTask(): void {
    if (this.editMode) {
      this.task.value = this.editedTaskValue;
      this.edit.emit(this.task);
    } else {
      this.editedTaskValue = this.task.value;
    }
    this.editMode = !this.editMode;
  }
}
