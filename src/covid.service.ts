import axios from 'axios';
import { CountryStat, CountryStatResponse } from './models';
import { DeathTollResponse } from './models copy';
import { humanizeDate, lastDayDeathToll } from './utils';

async function getGlobalStats(): Promise<CountryStat[]> {
  const url = 'https://api.covid19api.com/country/israel/status/confirmed';
  const {data} =  await axios.get<CountryStat[]>(url);

  return data
}


export async function getStats(): Promise<CountryStatResponse[]> {
  const data = await getGlobalStats();
  return data.map(({Date, Cases}) => ({cases: Cases , date: humanizeDate(Date)}));
}

export async function getYesterday(): Promise<any> {
  
}



