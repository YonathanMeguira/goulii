import express from 'express';
import { Request, Response } from 'express';
import { getStats } from './covid.service';
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

