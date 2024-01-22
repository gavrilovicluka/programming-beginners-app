import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-text.component.html',
  styleUrl: './task-text.component.css'
})
export class TaskTextComponent {
  @Input() showTask: boolean = false;
  @Input() taskText!: string;



}
