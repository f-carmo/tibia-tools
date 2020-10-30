import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooldownFormComponent } from './cooldown-form.component';

describe('CooldownFormComponent', () => {
  let component: CooldownFormComponent;
  let fixture: ComponentFixture<CooldownFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooldownFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooldownFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
