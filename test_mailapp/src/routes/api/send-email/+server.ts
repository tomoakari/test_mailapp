import { json } from '@sveltejs/kit'; 
import Mailjet from 'node-mailjet'

const MAILJET_API_KEY = "5da0559dbcf225700d9ed51dcb8fc1c3"
const MAILJET_API_SECRET = "7bafeb401ad08c3abe410c4957e092a5"
const SENDER_EMAIL = "info@openfire.site"


const mailjet = new Mailjet({
  apiKey: MAILJET_API_KEY,
  apiSecret: MAILJET_API_SECRET
})

export async function POST({ request }) {
  const { email, content } = await request.json();

  try {
    await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: SENDER_EMAIL,
            Name: "メール送信アプリだよ"
          },
          To: [
            {
              Email: email,
              Name: email
            }
          ],
          Subject: "新着メッセージ",
          TextPart: content
        }
      ]
    });

    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
