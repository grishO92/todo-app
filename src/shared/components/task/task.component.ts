import { Component, input, output, signal } from '@angular/core';
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
  task = input<Itask>();
  checked = output<boolean>();
  edit = output<Itask>();
  delete = output<void>();

  editMode = signal(false);
  editedTaskValue!: string;

  checkTask(checked: boolean): void {
    this.checked.emit(checked);
  }

  deleteTask(): void {
    this.delete.emit();
  }

  editTask(): void {
    if (this.editMode()) {
      this.task()!.value = this.editedTaskValue;
      this.edit.emit(this.task()!);
    } else {
      this.editedTaskValue = this.task()!.value;
    }

    this.editMode.update((mode) => (mode ? false : true));
  }
}
