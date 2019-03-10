import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { start } from 'repl';

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

  constructor() { }

  ngOnInit() { }

  updateTimerDisplay() {
    const doUpdate = () => {
      this.endTime = +new Date();
      const diff = ((this.endTime - this.startTime) / 1000);
      this.elapsed = moment.unix(diff).utc().format('mm:ss.S');
      console.log('this.testing = ' + this.testing);
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
    this.startDate = moment('1800-01-01');
    const span = this.endDate.diff(this.startDate, 'days');
    const rnd = Math.floor(Math.random() * span); // returns a random integer from 0 to 9
    this.startDate.add(rnd, 'days');
    this.TestDisplay = this.startDate.calendar();
    this.startTime = +new Date();
    this.updateTimerDisplay();
  }

  buttonPress(i: number) {
    if (this.startDate.day() === i) {
      this.buttonColors[i] = 'success';
      this.testing = false;
      this.updateTimerDisplay();
    } else {
      this.buttonColors[i] = 'danger';
    }
  }

}
