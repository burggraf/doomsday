interface Test {
    ts: number;
    date: string;
    tries: number;
    time: number;
}
export interface Stats {
    streak: number;
    recordStreak: number;
    tests: Array<Test>;
}
