import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentSubjectPage } from './student-subject.page';

describe('StudentSubjectPage', () => {
  let component: StudentSubjectPage;
  let fixture: ComponentFixture<StudentSubjectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
