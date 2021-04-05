import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarturnosComponent } from './generarturnos.component';

describe('GenerarturnosComponent', () => {
  let component: GenerarturnosComponent;
  let fixture: ComponentFixture<GenerarturnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarturnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
