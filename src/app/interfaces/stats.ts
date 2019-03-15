import { Moment } from 'moment';

interface Test {
    ts: Moment;
    date: string;
    tries: number;
    time: number;
}
export interface Stats {
    streak: number;
    recordStreak: number;
    tests: Array<Test>;
    trials: number;
    wins: number;
    lower: number;
    upper: number;
}
