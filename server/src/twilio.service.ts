import twilio from "twilio";

const accountSid = 'AC1457a689a7970a16a1696593dd7a2b6a';
const token = 'ca35e7d731d70b6a7ce6d064c5379fd0';
const client = twilio(accountSid, token);

export function sendMessage(to: string, message: string): Promise<any> {
  return client.messages
    .create({
      from: 'whatsapp:+14155238886',
      body: message,
      to: `whatsapp:${format(to)}`
    });
}



function format(phone: string): string {
  const without0 = phone.substring(1);
  return `+972${without0}`;
}