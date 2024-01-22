import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTextComponent } from '../task-text/task-text.component';
import { NextButtonComponent } from '../next-button/next-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TaskTextComponent, NextButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showTask: boolean = false;
  taskText: string = "";

  constructor(private router: Router) {
    this.taskText = "Unositi parne brojeve sve dok je njihova suma manja od 58."
  }

  onNextButtonClick() {
    if (this.showTask) {
      this.router.navigateByUrl('/even-numbers-sum', {
        state: { taskText: this.taskText }
      });
    }

    this.showTask = true;
  }
}
