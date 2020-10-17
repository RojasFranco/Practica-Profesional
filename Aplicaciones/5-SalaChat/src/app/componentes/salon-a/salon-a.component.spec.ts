import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonAComponent } from './salon-a.component';

describe('SalonAComponent', () => {
  let component: SalonAComponent;
  let fixture: ComponentFixture<SalonAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonAComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
