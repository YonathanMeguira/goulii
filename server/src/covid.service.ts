import axios from 'axios';
import { CountryStat, CountryStatResponse } from './models';
import { humanizeDate } from './utils';

async function getGlobalStats(): Promise<CountryStat[]> {
  const url = 'https://api.covid19api.com/country/israel/status/confirmed';
  const { data } = await axios.get<CountryStat[]>(url);

  return data
}


export async function getStats(): Promise<CountryStatResponse[]> {
  const data = await getGlobalStats();
  return data.map(({ Date, Cases }) => ({ cases: Cases, date: humanizeDate(Date) }));
}

export async function getYesterday(): Promise<string> {
  const stats = await getGlobalStats();
  const yesterday = stats[stats.length - 1].Cases;
  const beforeYesterday = stats[stats.length - 2].Cases;
  const result = yesterday - beforeYesterday;

  return `Hier il y a eu ${result} nouveaux cas en Israel`;
}



