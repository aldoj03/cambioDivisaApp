import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCambiosPage } from './list-cambios.page';

describe('ListCambiosPage', () => {
  let component: ListCambiosPage;
  let fixture: ComponentFixture<ListCambiosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCambiosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCambiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
