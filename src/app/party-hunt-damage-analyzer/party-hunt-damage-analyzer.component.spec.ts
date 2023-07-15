import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHuntDamageAnalyzerComponent } from './party-hunt-damage-analyzer.component';

describe('PartyHuntDamageAnalyzerComponent', () => {
  let component: PartyHuntDamageAnalyzerComponent;
  let fixture: ComponentFixture<PartyHuntDamageAnalyzerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartyHuntDamageAnalyzerComponent]
    });
    fixture = TestBed.createComponent(PartyHuntDamageAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
