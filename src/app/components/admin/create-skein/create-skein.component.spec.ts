import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkeinComponent } from './create-skein.component';

describe('CreateSkeinComponent', () => {
  let component: CreateSkeinComponent;
  let fixture: ComponentFixture<CreateSkeinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSkeinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
