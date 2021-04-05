import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoturnosComponent } from './listadoturnos.component';

describe('ListadoturnosComponent', () => {
  let component: ListadoturnosComponent;
  let fixture: ComponentFixture<ListadoturnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoturnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
