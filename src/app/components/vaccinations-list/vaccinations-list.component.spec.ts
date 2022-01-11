import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationsListComponent } from './vaccinations-list.component';

describe('VaccinationsListComponent', () => {
  let component: VaccinationsListComponent;
  let fixture: ComponentFixture<VaccinationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
