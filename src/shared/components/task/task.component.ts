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
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  checkTask(checked: boolean): void {
    this.checked.emit(checked);
  }

  deleteTask(): void {
    this.delete.emit();
  }

  editTask(): void {
    this.edit.emit();
  }
}
