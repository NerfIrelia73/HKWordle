import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiedComponent } from './copied.component';

describe('CopiedComponent', () => {
  let component: CopiedComponent;
  let fixture: ComponentFixture<CopiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
