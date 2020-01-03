import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { PopoverController, NavController, ToastController } from '@ionic/angular';
import { CustomerPage } from '../customer/customer.page';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  public customers = this.fs.getData()
  public rand = Math.floor((Math.random() * 3))

  constructor(
    private fs: FirebaseService, 
    public popoverController: PopoverController, 
    private route: NavController, 
    private toastController: ToastController) { }

  ngOnInit() {
  }

  delCustomer(key){
    event.stopPropagation()
    this.fs.deleteRecord(key)
    this.presentToastWithOptions()
  }

  goToUpdate(key){
    this.route.navigateForward('/customers/'+key+'/true')
    event.stopPropagation()
  }

  async presentPopover(ev: any, key: string) {
    const popover = await this.popoverController.create({
      component: CustomerPage,
      cssClass: 'ionic-my-popover',
      componentProps: {
        id: key
      },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Deleted Successfully!!',
      position: 'bottom',
      color: 'danger',
      cssClass: 'ion-modal-text-style',
      duration: 1000,
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
