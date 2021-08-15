import twilio from "twilio";

const accountSid = 'AC1457a689a7970a16a1696593dd7a2b6a';
const token = '36f483696d3583d8bdd39f0fbe0d21df';
const client = twilio(accountSid, token);

export function sendMessage(message: string): Promise<any> {
    return client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: message,
         to: 'whatsapp:+972586288454'
       });
}