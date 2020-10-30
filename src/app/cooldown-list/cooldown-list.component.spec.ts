import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooldownListComponent } from './cooldown-list.component';

describe('CooldownListComponent', () => {
  let component: CooldownListComponent;
  let fixture: ComponentFixture<CooldownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooldownListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CooldownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
