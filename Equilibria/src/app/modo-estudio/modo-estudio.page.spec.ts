import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModoEstudioPage } from './modo-estudio.page';

describe('ModoEstudioPage', () => {
  let component: ModoEstudioPage;
  let fixture: ComponentFixture<ModoEstudioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoEstudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
