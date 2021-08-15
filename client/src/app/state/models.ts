export type Covid19Stats = {
    cases: number;
    date: string;
}

export type AppState = {
    covidStats: Covid19Stats[];
}