import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeinComponent } from './skein.component';

describe('SkeinComponent', () => {
  let component: SkeinComponent;
  let fixture: ComponentFixture<SkeinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
