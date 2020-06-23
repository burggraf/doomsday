import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ShowworkService {
  centuryBases = [
    -2, 3, 1, -1
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
    1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6
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

    o.push(date.format('MMMM') + ' Base: <b>' + monthTarget + '</b>');
    if (date.date() >= 7) {
      o.push(date.date().toString() + ' % 7 = <b>' + (date.date() % 7).toString() + '</b>');
    }
    const dateMod = (date.date() % 7);
    let tally = (monthTarget + dateMod) % 7;
    o.push('(' + monthTarget + ' + ' + dateMod + ' = ' +
    (monthTarget + dateMod < 7 ? '<b>' : '') + 
     (monthTarget + dateMod).toString() +
     (monthTarget + dateMod < 7 ? '</b>' : '') + 
     ')' + ((monthTarget + dateMod >= 7) ? ' % 7 = <b>' + tally.toString() + '</b>' : ''));

    const cIndex = centuryBase;
    console.log('centuryBase', centuryBase)
    console.log('cIndex', cIndex);
    o.push(
      tally.toString() +
      ((centuryBase > 0) ? '+': '') +
      centuryBase.toString() + ' (' +
      century.toString() + '00)' +
      ((tally + centuryBase >= 7) ? ' % 7  = ' : ' = ')
      + '<b>' + ((tally + centuryBase) % 7).toString() + '</b>');
    tally = (tally + cIndex) % 7;


    o.push('Year: ' + YY);
    let yearBase;
    // let yearBase = year % 28;
    if (year >= 90) {
      o.push(YY + ' - 90 = ' + (year - 90).toString() + 
      ' + 6 = ' + (year - 90 + 6).toString());
      yearBase = year - 90;
    } else if (year >= 60) {
      o.push(YY + ' - 60 = ' + (year - 60).toString() + 
      ' + 4 = ' + (year - 60 + 4).toString());
      yearBase = year - 60;
    } else if (year >= 30) {
      o.push(YY + ' - 30 = ' + (year - 30).toString() + 
      ' + 2 = ' + (year - 30 + 2).toString()); 
      yearBase = year - 30;
    }
    const leapDays = Math.floor(yearBase / 4);
    o.push(yearBase.toString() + ' + ' + leapDays.toString() +
    ' leapDays = ' + (yearBase + leapDays).toString());
    yearBase = yearBase + leapDays;
    o.push(yearBase  + ' % 7 = ' + (yearBase % 7).toString());
    yearBase = yearBase % 7;
    
    if (tally + yearBase >= 7) {
      o.push('(' + tally + ' + ' + yearBase.toString() + ' = ' + (tally + yearBase).toString() + ')' + ' % 7 = ' +
      '<b>' + ((tally + yearBase) % 7).toString() + '</b>'
      ); 
    } else {
      o.push(tally + ' + ' + yearBase.toString() + ' = ' +
      '<b>' + ((tally + yearBase) % 7).toString() + '</b>'
      ); 
    }
    tally = (tally + yearBase) % 7;

    const subtractOneDay = (isLeap && date.month() < 2);
    o.push('leap adjustment: ' + (subtractOneDay ? 'Yes' : 'No'));
    if (subtractOneDay) {
      o.push(tally + ' - 1 = ' + (tally - 1).toString()
      + ((tally - 1) < 0 ? ' + 7 = ' + (tally - 1 + 7).toString() : '')
      );
      tally = tally - 1;
      if (tally < 0) {
        tally += 7;
      }
    }
    o.push(tally + ' = ' + this.days[tally]);

    return o;
  }
}
