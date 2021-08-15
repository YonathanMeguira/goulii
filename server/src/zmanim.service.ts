import axios from "axios";
import { formatTime } from "./utils";

const netanyaGeoId = 294071;


function getDateParams() {
    const year = new Date().getFullYear();
    let month: any = new Date().getMonth();
    let day: any = new Date().getDate();
    if (month < 10) {
        month = `0${month}`;
    }

    if (day < 10) {
        day = `0${day}`
    }

    return {year, month, day};

}

function getUrl(): string {
    const {year, month, day} = getDateParams();
    return `https://www.hebcal.com/zmanim?cfg=json&geonameid=${netanyaGeoId}&date=${year}-${month}-${day}`;
}


export async function getZmanim(): Promise<string> {
    const {data: {times}} = await axios.get(getUrl());
    Object.keys(times).forEach(key => {
        const time = new Date(times[key]);
        times[key] = `${time.getHours()}:${time.getMinutes()}`
    })

    return formatTime(times);
}


export function shouldFetchShabbathTime(): boolean {
    return new Date().getDay() === 5;
}


export async function fetchShabbathTime(): Promise<string> {
    const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=${netanyaGeoId}&M=on`;
    const {data: {items}} = await axios.get(url);
    const {memo, title} = items[0];
    
    return `${memo}, ${title}`;
}
