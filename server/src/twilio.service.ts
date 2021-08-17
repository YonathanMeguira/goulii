import twilio from "twilio";

const accountSid = 'AC1457a689a7970a16a1696593dd7a2b6a';
const token = '4455d4886abb4e028de11b58ddd95288';
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