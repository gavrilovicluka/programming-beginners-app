import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEvenNumbersSumDialogComponent } from './task-even-numbers-sum-dialog.component';

describe('TaskEvenNumbersSumDialogComponent', () => {
  let component: TaskEvenNumbersSumDialogComponent;
  let fixture: ComponentFixture<TaskEvenNumbersSumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEvenNumbersSumDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskEvenNumbersSumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
