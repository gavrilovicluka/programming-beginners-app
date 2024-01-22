import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-button',
  standalone: true,
  imports: [],
  templateUrl: './next-button.component.html',
  styleUrl: './next-button.component.css'
})
export class NextButtonComponent {
  @Input() showTask: boolean = false;
  @Input() taskText!: string;
  @Input() navigatePath!: string;

  constructor(private router: Router) { }

  onNextButtonClick() {
    if (this.showTask) {
      this.router.navigateByUrl(`${this.navigatePath}`, {
        state: { taskText: this.taskText }
      });
    }

    this.showTask = true;
  }
}
