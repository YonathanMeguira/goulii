import express from 'express';
import { getCasesByDay, getStats, getYesterday } from './covid.service';
import { startDay } from './start-day.service';
import { sendMessage } from './twilio.service';
import { fetchShabbathTime, getZmanim } from './zmanim.service';
const app = express();
const port: number = Number(process.env.PORT) || 3001;

app.listen(port);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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


// app.get('/by-day', async(request, response, next) => {
//   try {
//     response.send(await getCasesByDay());
//   } catch (error) {
//     return next(error);
//   }
// })



