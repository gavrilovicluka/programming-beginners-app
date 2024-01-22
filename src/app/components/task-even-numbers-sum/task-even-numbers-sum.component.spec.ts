import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEvenNumbersSumComponent } from './task-even-numbers-sum.component';

describe('TaskEvenNumbersSumComponent', () => {
  let component: TaskEvenNumbersSumComponent;
  let fixture: ComponentFixture<TaskEvenNumbersSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskEvenNumbersSumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskEvenNumbersSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
