import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SplashAnimacionPage } from './splash-animacion.page';

describe('SplashAnimacionPage', () => {
  let component: SplashAnimacionPage;
  let fixture: ComponentFixture<SplashAnimacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashAnimacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SplashAnimacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
