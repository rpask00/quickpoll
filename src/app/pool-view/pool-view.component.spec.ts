import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolViewComponent } from './pool-view.component';

describe('PoolViewComponent', () => {
  let component: PoolViewComponent;
  let fixture: ComponentFixture<PoolViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
