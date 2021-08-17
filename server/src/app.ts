import express from 'express';
import bodyParser from 'body-parser';
import { getLogs, getUsers, processLog } from './firebase.service';

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
 * 
 * 
 * user goes on the platform, adds log and associates user to it.
 * in return user gets id.
 * 
 * in the client he writes invoke(id);
 * 
 * logEvent(users.Jonathan, 'wow this is really bad');
 * user.Jonathan = '5iNSvvsXLxrlm7vt7l1c';
 * 
 * we maintain two tables: users and logs
 */
 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/log', async (request, response) => {
  try {
    const {userId, log} = request.body;
    await processLog(userId, log);
    response.sendStatus(200);
  } catch (error) {
    response.sendStatus(405);
  }
})

app.get('/get-logs', async (request, response) => {
  try {
    response.json(await getLogs());
  } catch (error) {
    response.sendStatus(405);
  }
})

app.get('/get-users', async (request, response) => {
  try {
    response.json(await getUsers());
  } catch (error) {
    response.sendStatus(405);
  }
})

