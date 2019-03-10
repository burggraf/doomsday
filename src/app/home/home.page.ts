import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  test() {
    this.testing = true;
    console.log('test...');
    for (let i = 0; i < 7; i++) {
      this.buttonColors[i] = 'light';
    }
    this.startDate = moment('1800-01-01');
    const span = this.endDate.diff(this.startDate, 'days');
    console.log('span: ' + span);
    const rnd = Math.floor(Math.random() * span); // returns a random integer from 0 to 9
    this.startDate.add(rnd, 'days');
    this.TestDisplay = this.startDate.calendar();
  }

  buttonPress(i: number) {
    if (this.startDate.day() === i) {
      this.buttonColors[i] = 'success';
      this.testing = false;
    } else {
      this.buttonColors[i] = 'danger';
    }
  }



}
