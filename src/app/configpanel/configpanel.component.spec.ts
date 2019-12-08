import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigpanelComponent } from './configpanel.component';

describe('ConfigpanelComponent', () => {
  let component: ConfigpanelComponent;
  let fixture: ComponentFixture<ConfigpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
