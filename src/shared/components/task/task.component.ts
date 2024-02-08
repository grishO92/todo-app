import { Component, Input } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  standalone: true,
})
export class TaskComponent {
  @Input() isChecked: boolean = false;
  @Input() taskValue: string = '';
}
