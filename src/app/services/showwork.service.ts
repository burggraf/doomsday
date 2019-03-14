import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ShowworkService {
  centuryBases = [
    2, 0, 5, 3
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
  monthTargets = [
    3, 7, 7, 4, 9, 6, 11, 8, 5, 10, 7, 12
  ];
  constructor() { }
  public showWork(date: moment.Moment) {
    const isOdd = (n) => {
      return n % 2 !== 0;
     };

    const o = [];
    // date = moment('02/07/2000');
    // o.push(date.format('MM/DD/YYYY'));
    const century = Math.floor(date.year() / 100);
    const centuryBase = this.centuryBases[century % 4];
    const isLeap = date.isLeapYear();
    // o.push('Century: ' + century.toString() + '00 [' +  centuryBase.toString() + ']');
    const year = date.year() % 100;
    const YY = year.toString().padStart(2, '0');
    const MM = (date.month() + 1).toString().padStart(2, '0');
    const DD = date.date().toString().padStart(2, '0');
    let mIndex;
    const monthTarget = this.monthTargets[date.month()];

    o.push(date.format('MMMM') + ' Base: ' + monthTarget);
    mIndex = date.date() - monthTarget;
    o.push(date.date() + ' - ' + monthTarget + ' = <b>' + mIndex + '</b>');
    if (mIndex >= 7 || mIndex <= -7) {
      o.push(mIndex + ' % 7 = <b><span style="color: red;">' + (mIndex % 7) + '</span></b>');
      mIndex %= 7;
    }
    if (mIndex < 0) {
      o.push('(' + mIndex + ') + 7 = <b>' + (mIndex + 7) + '</b>');
      mIndex += 7;
    }

    o.push('Year: ' + YY);
    let yIndex = year;
    if (isOdd(year)) {
      yIndex += 11;
      o.push(YY + ' + 11 = <b>' + yIndex.toString() + '</b>');
    }
    o.push(yIndex + ' / 2 = <b>' + (yIndex / 2).toString() + '</b>');
    yIndex /= 2;
    if (isOdd(yIndex)) {
      o.push(yIndex + ' + 11 = <b>' + (yIndex + 11).toString() + '</b>');
      yIndex += 11;
    }
    let next7 = (7 - (yIndex % 7)) + yIndex;
    if (next7 - yIndex === 7) {
      next7 -= 7;
    }
    o.push('next 7 is <b>' + next7.toString() + '</b>');
    o.push(next7.toString() + ' - ' + yIndex + ' = <b><span style="color: red;">' +
      (next7 - yIndex).toString() + '</span></b>');
    yIndex = next7 - yIndex;

    const subtractOneDay = (isLeap && date.month() < 2);
    o.push('leap adjustment: ' + (subtractOneDay ? 'Yes' : 'No'));
    let lIndex = 0;
    if (subtractOneDay) {
      lIndex = -1;

    }

    const cIndex = centuryBase;
    o.push('century offset (' + century + '00) = <b><span style="color: red;">' + cIndex + '</span></b>');

    let index = mIndex + yIndex + lIndex + cIndex;
    if (index >= 7) {
      o.push(mIndex + ' + ' + yIndex + ' + ' + lIndex + ' + ' + cIndex + ' = ' + index);
      o.push(index + ' % 7 = <b><span style="color: red;">' + (index %  7) + '</span></b>');
      index %= 7;
    } else {
      o.push(mIndex + ' + ' + yIndex + ' + ' + lIndex + ' + ' + cIndex + ' = <b><span style="color: red;">' + index + '</span></b>');
    }
    o.push(index + ' = ' + this.days[index]);

    return o;
  }
}
