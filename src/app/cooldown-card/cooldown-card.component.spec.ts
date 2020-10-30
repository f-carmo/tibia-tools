import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooldownCardComponent } from './cooldown-card.component';

describe('CooldownCardComponent', () => {
  let component: CooldownCardComponent;
  let fixture: ComponentFixture<CooldownCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooldownCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooldownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
