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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// transforms earliestTefila to earliest tfila
export function splitKey(key: string): string {
  let props = '';
  const splitted = key.split(/(?=[A-Z])/);
  splitted.forEach(w => props+=`${w} `);

  return props;
}

export function formatTime(times: any): string {
  let text = ``;
  // {earliestTefila: 6:00} => {Earliest Tefila: 6:00}
  Object.keys(times).forEach(key => text += `${capitalizeFirstLetter(splitKey(key))} : ${times[key]} \n `);

  return text;
}