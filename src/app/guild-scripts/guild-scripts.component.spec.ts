import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildScriptsComponent } from './guild-scripts.component';

describe('GuildScriptsComponent', () => {
  let component: GuildScriptsComponent;
  let fixture: ComponentFixture<GuildScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildScriptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
