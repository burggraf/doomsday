import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Stats } from '../interfaces/stats';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  moment = moment;
  TestDisplay = '';
  startDate = moment('1800-01-01');
  endDate = moment('2200-01-01');
  testing = false;
  startTime = 0;
  endTime = 0;
  elapsed = moment.unix(0).utc().format('mm:ss.S');
  stats: Stats = {
    streak: 0,
    recordStreak: 0,
    tests: []
  };
  tries = 0;
  buttonColors = [
    'light',
    'light',
    'light',
    'light',
    'light',
    'light',
    'light'
  ];
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(private storage: Storage) { }

  async ngOnInit() {
  }

  updateTimerDisplay() {
    const doUpdate = () => {
      this.endTime = +new Date();
      const diff = ((this.endTime - this.startTime) / 1000);
      this.elapsed = moment.unix(diff).utc().format('mm:ss.S');
      if (this.testing) {
        setTimeout(function () {
          doUpdate();
        }, 100);
      }
    };
    doUpdate();
  }

  test() {
    this.testing = true;
    for (let i = 0; i < 7; i++) {
      this.buttonColors[i] = 'light';
    }
    this.tries = 0;
    this.startDate = moment('1800-01-01');
    const span = this.endDate.diff(this.startDate, 'days');
    const rnd = Math.floor(Math.random() * span); // returns a random integer from 0 to 9
    this.startDate.add(rnd, 'days');
    this.TestDisplay = this.startDate.format('MM/DD/YYYY');
    this.startTime = +new Date();
    this.updateTimerDisplay();
  }

  buttonPress(i: number) {
    this.tries++;
    if (this.startDate.day() === i) {
      this.buttonColors[i] = 'success';
      this.testing = false;
      this.updateTimerDisplay();
      this.saveScore();
    } else {
      this.buttonColors[i] = 'danger';
    }
  }

  saveScore() {
    this.stats.tests.unshift({
      'ts': +new Date(),
      'date': this.startDate.format('MM/DD/YYYY'),
      'tries': this.tries,
      'time': ((this.endTime - this.startTime) / 1000)
    });
    if (this.tries === 1) {
      this.stats.streak++;
      if (this.stats.streak > this.stats.recordStreak) {
        this.stats.recordStreak = this.stats.streak;
      }
    } else {
      this.stats.streak = 0;
    }
    this.storage.set('stats', this.stats);
  }
  async ionViewWillEnter() {
    console.log('home ionViewWillEnter');
    this.stats = await this.storage.get('stats');
    if (this.stats === null) {
      this.stats = {
        streak: 0,
        recordStreak: 0,
        tests: []
      };
    }
  }

}
