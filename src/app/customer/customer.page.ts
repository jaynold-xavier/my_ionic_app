import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {
  public cust;

  constructor(private fs: FirebaseService, private nav: NavParams, private pop: PopoverController) {
    this.cust = this.fs.getSingleObject(this.nav.get('id')).valueChanges()
   }

  ngOnInit() {
  }

  closePopOver(){
    this.pop.dismiss()
    event.stopPropagation()
  }

  getCustomer(key){
    this.fs.getSingleObject(this.nav.get('id'))
  }

}
