import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKitComponent } from './create-kit.component';

describe('CreateKitComponent', () => {
  let component: CreateKitComponent;
  let fixture: ComponentFixture<CreateKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
