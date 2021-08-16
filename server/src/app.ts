import express from 'express';
import bodyParser from 'body-parser';
import { addLog, sendAlert } from './firebase.service';

const app = express();
const port: number = Number(process.env.PORT) || 3001;

app.listen(port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/*******************************
 * goulii loggin platform alert via whatsapp notifications
 * /*********
 * 1. sends alert via whatsapp
 * 2. adds alert on firebase
 * 3. if Alert already there increase the invokation times
 */
 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/add-log', async (request, response) => {
  try {
    const {log, author} = request.body;
    const id = await addLog(author, log);
    response.send(id);
  } catch (error) {
    response.sendStatus(405);
  }
})


app.post('/invoke-log', async(request, response) => {
  try {
    const {to, log} = request.body;
    const mess =  sendAlert(to, log);
    console.log(mess);
    await addLog(to, log);
    response.sendStatus(200);
  } catch(error) {
    response.sendStatus(405);
  }
})