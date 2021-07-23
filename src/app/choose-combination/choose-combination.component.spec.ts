import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCombinationComponent } from './choose-combination.component';

describe('ChooseCombinationComponent', () => {
  let component: ChooseCombinationComponent;
  let fixture: ComponentFixture<ChooseCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCombinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
