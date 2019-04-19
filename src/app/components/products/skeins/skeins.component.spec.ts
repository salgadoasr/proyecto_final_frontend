import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeinsComponent } from './skeins.component';

describe('SkeinsComponent', () => {
  let component: SkeinsComponent;
  let fixture: ComponentFixture<SkeinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkeinsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
