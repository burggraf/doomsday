import { Component, OnInit, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { IonRange, IonContent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Stats } from '../interfaces/stats';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterViewInit {
  @ViewChild(IonRange, { read: IonRange }) slider: IonRange;
  @ViewChild(IonContent) content: IonContent;
  stats: Stats = {
    streak: 0,
    recordStreak: 0,
    tests: []
  };
  // moment = moment;
  showLog = false;
  constructor(private storage: Storage,
    private alertController: AlertController) {

  }

  async ngOnInit() {
  }

  ngAfterViewInit() {

  }
  async ionViewWillEnter() {
    console.log('settings ionViewWillEnter');
    this.stats = await this.storage.get('stats');
    if (this.stats === null) {
      this.stats = {
        streak: 0,
        recordStreak: 0,
        tests: []
      };
    }
  }
  rangeChange(evt) {
    console.log('evt', evt);
    console.log('lower', evt.detail.value.lower);
    console.log('upper', evt.detail.value.upper);
    console.log('slider:', this.slider);
  }

  async clearStats() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.stats = {
              streak: 0,
              recordStreak: 0,
              tests: []
            };
            this.storage.set('stats', this.stats);
          }
        }
      ]
    });

    await alert.present();
  }

}
