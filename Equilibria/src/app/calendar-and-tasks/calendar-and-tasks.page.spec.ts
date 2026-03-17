import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarAndTasksPage } from './calendar-and-tasks.page';

describe('CalendarAndTasksPage', () => {
  let component: CalendarAndTasksPage;
  let fixture: ComponentFixture<CalendarAndTasksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAndTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
