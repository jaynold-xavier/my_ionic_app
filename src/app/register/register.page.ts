import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from "../firebase.service";
import { ToastController, ModalController, NavController } from '@ionic/angular';
import { AvatarlistPage } from '../avatarlist/avatarlist.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  update: boolean = false
  id: string = '';
  task;

  cust;
  avatar_id = '0'
  avaimage = 'https://api.adorable.io/avatars/face/' + this.avatar_id;

  myavatext
  avacol

  //getters
  get name() {
    return this.registrationForm.get("name");
  }

  get dob() {
    return this.registrationForm.get("dob");
  }

  get gender() {
    return this.registrationForm.get("gender");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  public error_messages = {
    name:[
      {
        type: 'required',
        message: 'Name is a required field'
      },
      {
        type: 'minlength',
        message: 'Name must be atleast 5 characters long'
      },
    ],
    dob:[
      {
        type: 'required',
        message: 'Date of Birth is a required field'
      },
      {
        type: 'max',
        message: 'You must be above 18 to register'
      }
    ],
    gender:[
      {
        type: 'required',
        message: 'Gender is a required field'
      }
    ],
    email:[
      {
        type: 'required',
        message: 'Email is a required field'
      },
      {
        type: 'pattern',
        message: 'Please enter a valid email address'
      }
    ],
  }
  
  registrationForm = this.formBuilder.group({
    name:['', [Validators.required, Validators.minLength(5)]],
    dob:['', [Validators.required, Validators.max(1999)]],
    gender:['', Validators.required],
    email:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
  })
  
  constructor(
    private formBuilder: FormBuilder, 
    private fs: FirebaseService,
    private toastController: ToastController, 
    private modalController: ModalController,
    private nav: NavController,
    private route: ActivatedRoute, 
    private my_cust: FirebaseService) { 
      
      this.update = route.snapshot.params['update']
      this.id = route.snapshot.params['key']

      if (this.update) {
        my_cust.getSingleObject(this.id).snapshotChanges().subscribe(data => {
          this.cust = {
            name: data.payload.child('name').val(),
            age: data.payload.child('age').val(),
            gender: data.payload.child('gender').val(),
            email: data.payload.child('email').val(),
            dob: data.payload.child('dob').val(),
            avatar_id: data.payload.child('avatar_id').val(),
          }
          this.avatar_id = data.payload.child('avatar_id').val()
          this.avaimage = 'https://api.adorable.io/avatars/face/' + this.cust.avatar_id
        })
      }
      this.myavatext = this.update ? 'AVATAR SELECTED': 'DEFAULT AVATAR'
      this.avacol = this.update ? 'success': 'primary'
  } 

  ngOnInit() {
    this.cust = {
      name: '',
      age: '',
      gender: '',
      email: '',
      dob: '',
      avatar_id: 0
    }

    this.task = this.update ? 'Update' : "Register"
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AvatarlistPage
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    this.avatar_id = data.chosen_avatar

    this.myavatext = "AVATAR SELECTED!"
    this.avacol = "success"
    this.avaimage = 'https://api.adorable.io/avatars/face/' + this.avatar_id
  }

  registerCustomer(){
    let dt = new Date(this.dob.value).getFullYear()
    
    this.cust.name = this.name.value
    this.cust.dob = this.dob.value
    this.cust.age = Math.abs(dt - new Date(Date.now()).getFullYear())
    this.cust.gender = this.gender.value
    this.cust.email = this.email.value
    this.cust.avatar_id = this.avatar_id

    this.fs.pushData(this.cust)
    this.presentToastWithOptions('Registration')
    this.nav.navigateForward('/customers')
  }

  updateCustomer() {
    let dt = new Date(this.dob.value).getFullYear()

    this.cust.name = this.name.value
    this.cust.dob = this.dob.value
    this.cust.age = Math.abs(dt - new Date(Date.now()).getFullYear())
    this.cust.gender = this.gender.value
    this.cust.email = this.email.value
    this.cust.avatar_id = this.avatar_id

    this.fs.updateRecord(this.id, this.cust)
    this.presentToastWithOptions('Update')
    this.nav.navigateForward('/customers')
  }

  async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess +' Complete!!',
      position: 'bottom',
      color: 'success',
      cssClass: 'ion-modal-text-style',
      duration: 2000,
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          icon: 'trash',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
