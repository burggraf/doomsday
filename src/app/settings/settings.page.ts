import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  stats = {};
  moment = moment;
  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.stats = await this.storage.get('stats');
    if (this.stats === null) {
      this.stats = {};
    }
  }

}
