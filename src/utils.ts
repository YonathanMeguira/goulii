import { CountryStatResponse } from "./models";

export function humanizeDate(date: string): string {
  return new Date(date).toLocaleDateString(
    'en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
}


export function sortStats(statA: CountryStatResponse, statB: CountryStatResponse): number {
  if (statA.cases < statB.cases) {
    return 1;
  }
  if (statA.cases > statB.cases) {
    return -1;
  }
  return 0;
}

export function lastDayDeathToll(stats: CountryStatResponse[]): number {
  return stats[stats.length - 1].cases - stats[stats.length - 20].cases;
}

export function getYesterday(data: CountryStatResponse) {
  
}