import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTextComponent } from './task-text.component';

describe('TaskTextComponent', () => {
  let component: TaskTextComponent;
  let fixture: ComponentFixture<TaskTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
