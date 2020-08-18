import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetCambiosPage } from './set-cambios.page';

describe('SetCambiosPage', () => {
  let component: SetCambiosPage;
  let fixture: ComponentFixture<SetCambiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetCambiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetCambiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
