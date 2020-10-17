import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonBComponent } from './salon-b.component';

describe('SalonBComponent', () => {
  let component: SalonBComponent;
  let fixture: ComponentFixture<SalonBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonBComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
