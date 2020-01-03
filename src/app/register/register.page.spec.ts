import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  const formBuilderMock: FormBuilder = new FormBuilder();
  let fireServiceMock: any

  beforeEach(async(() => {
    fireServiceMock = {
      addCustomer: jest.fn().mockName('fireServiceMock.pushData')
    };

    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule ],
      providers: 
    [ 
      { provide: FormBuilder, useValue: formBuilderMock },
      { provide: FirebaseService, useValue: fireServiceMock }
    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
