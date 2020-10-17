import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CosasFeasComponent } from './cosas-feas.component';

describe('CosasFeasComponent', () => {
  let component: CosasFeasComponent;
  let fixture: ComponentFixture<CosasFeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosasFeasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CosasFeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
