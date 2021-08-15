import { getYesterday } from "./covid.service";
import { sendMessage } from "./twilio.service";
import { getZmanim, shouldFetchShabbathTime, fetchShabbathTime } from "./zmanim.service";

export async function startDay(): Promise<number> {
    const covid19IsraelSummary: string = await getYesterday();
    const zmanim: string = await getZmanim();

    let message =  `${covid19IsraelSummary}\n \n ${zmanim}`;
    if (shouldFetchShabbathTime()) {
        const shabbathTime = await fetchShabbathTime();
        message += `\n ${shabbathTime}`;
    }
    await sendMessage(message);

    return 200;
}
  