import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import * as moment from 'moment';
import { Storage } from '@ionic/storage';

import { Stats } from '../interfaces/stats';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit, AfterViewInit {

  sliderValue = {lower: 1800, upper: 2000};
  stats: Stats = {
    streak: 0,
    recordStreak: 0,
    tests: [],
    trials: 0,
    wins: 0,
    passes: 0,
    lower: 1800,
    upper: 2000
  };
  // moment = moment;
  showLog = false;
  constructor(private storage: Storage,
    private alertController: AlertController) {

  }

  async ngOnInit() {
    console.log('** ngOnInit');
  }

  async ngAfterViewInit() {
    console.log('** ngAfterViewInit');
  }

  async ionViewWillEnter() {
    console.log('settings ionViewWillEnter');
    this.stats = await this.storage.get('stats');
    if (this.stats === null) {
      this.stats = {
        streak: 0,
        recordStreak: 0,
        tests: [],
        trials: 0,
        wins: 0,
        passes: 0,
        lower: 1800,
        upper: 2000
      };
    }
    if (!this.stats.lower) {
      this.stats.lower = 1800;
    }
    if (!this.stats.upper) {
      this.stats.upper = 2000;
    }
    this.sliderValue = { lower: this.stats.lower, upper: this.stats.upper };
  }
  rangeChange(evt) {
    this.stats.lower = evt.detail.value.lower;
    this.stats.upper = evt.detail.value.upper;
    this.storage.set('stats', this.stats);
    // console.log('evt', evt);
    // console.log('lower', evt.detail.value.lower);
    // console.log('upper', evt.detail.value.upper);
    this.sliderValue.lower = evt.detail.value.lower;
    this.sliderValue.upper = evt.detail.value.upper;
    // console.log('sliderValue: ', this.sliderValue);
  }

  async clearStats() {
    const alert = await this.alertController.create({
      header: 'Clear Stats',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.stats = {
              streak: 0,
              recordStreak: 0,
              tests: [],
              trials: 0,
              wins: 0,
              passes: 0,
              lower: 1800,
              upper: this.stats.upper
            };
            this.storage.set('stats', this.stats);
          }
        }
      ]
    });

    await alert.present();
  }

}
