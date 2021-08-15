import express from 'express';
import { getStats, getYesterday } from './covid.service';
import { startDay } from './start-day.service';
import { sendMessage } from './twilio.service';
import { fetchShabbathTime, getZmanim } from './zmanim.service';
const app = express();
const port: number = Number(process.env.PORT) || 3001;

app.listen(port);


app.get('/covid', async (request, response, next) => {
  try { 
    response.send(await getStats());
  } catch(error) {
    return next(error);
  }
})


app.get('/yesterday', async(request, response, next) => {
  try {
    response.send(await getYesterday());
  } catch (error) {
    return next(error);
  }
})


app.get('/zmanim', async(request, response, next) => {
  try {
    response.send(await getZmanim());
  } catch (error) {
    return next(error);
  }
})

app.get('/shabbath', async(request, response, next) => {
  try {
    response.json(await fetchShabbathTime());
  } catch (error) {
    return next(error);
  }
})


app.get('/start', async(request, response, next) => {
  try {
    response.sendStatus(await startDay());
  } catch (error) {
    return next(error);
  }
})



