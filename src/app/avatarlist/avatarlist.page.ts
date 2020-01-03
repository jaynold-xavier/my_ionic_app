import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-avatarlist',
  templateUrl: './avatarlist.page.html',
  styleUrls: ['./avatarlist.page.scss'],
})
export class AvatarlistPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(id) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'chosen_avatar': id
    });
  }
}
