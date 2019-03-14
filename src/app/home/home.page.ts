import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { Stats } from '../interfaces/stats';
import { ShowworkService } from '../services/showwork.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
  elapsed = 0; // moment.unix(0).utc().format('ss.S');
  stats: Stats = {
    streak: 0,
    recordStreak: 0,
    tests: [],
    trials: 0,
    wins: 0
  };
  tries = 0;
  steps = [];
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
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];

  constructor(private storage: Storage,
              private showWorkService: ShowworkService,
              private sanitizer: DomSanitizer) {
    console.log(this.showWorkService.showWork(moment('1879-12-27')));
    /*
    console.log(this.showWorkService.showWork(moment('1850-02-03')));
    console.log(this.showWorkService.showWork(moment('1967-04-16')));
    console.log(this.showWorkService.showWork(moment('1995-12-31')));
    console.log(this.showWorkService.showWork(moment('1995-12-01')));
    console.log(this.showWorkService.showWork(moment('2019-03-11')));
    console.log(this.showWorkService.showWork(moment('2100-12-22')));
    */
   }

  async ngOnInit() {
  }

  updateTimerDisplay() {
    const doUpdate = () => {
      this.endTime = +new Date();
      this.elapsed = Math.min(((this.endTime - this.startTime) / 1000), 99.9);
      // console.log(diff);
      // this.elapsed = diff; // moment.unix(diff).utc().format('ss.S');
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
    this.steps = [];
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
      'ts': moment(), // +new Date(),
      'date': this.startDate.format('MM/DD/YYYY'),
      'tries': this.tries,
      'time': Math.min(((this.endTime - this.startTime) / 1000), 99.9)
    });
    if (!this.stats.trials) {
      this.stats.trials = 0;
    }
    if (!this.stats.wins) {
      this.stats.wins = 0;
    }
    this.stats.trials++;
    if (this.tries === 1) {
      this.stats.wins++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.recordStreak) {
        this.stats.recordStreak = this.stats.streak;
      }
    } else {
      this.stats.streak = 0;
    }
    const arr = this.showWorkService.showWork(this.startDate);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = this.sanitizer.bypassSecurityTrustHtml(arr[i]);
    }
    this.steps = arr;
  this.storage.set('stats', this.stats);
  }

  async ionViewWillEnter() {
    console.log('home ionViewWillEnter');
    this.stats = await this.storage.get('stats');
    if (this.stats === null) {
      this.stats = {
        streak: 0,
        recordStreak: 0,
        tests: [],
        trials: 0,
        wins: 0
      };
    }
  }

}
