
export type CountryStat = {
    Country: string;
    CountryCode: string;
    Province: string;
    CityCode: string;
    Lat: string;
    Lon: string;
    Cases: number;
    Status: string;
    Date: string;
}

export type CountryStatResponse = {
    date: string;
    cases: number;
}

export type DeathTollResponse = {
    deaths: number;
    lastReferenceDate: string;
}