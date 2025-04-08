const express = require('express');
const axios = require('axios'); // ← LINEへ返信するために必要
const app = express();
const port = process.env.PORT || 3000;
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

// これを追加（先頭付近、expressの下くらい）
require('dotenv').config();

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  // 複数イベントが来る可能性があるので forEach
  events.forEach(async (event) => {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      const replyMessage = {
        replyToken: replyToken,
        messages: [
          {
            type: 'text',
            text: `「${userMessage}」ですね！メッセージありがとうございます😊`
          }
        ]
      };

      // LINE Messaging API にPOST
      try {
        await axios.post('https://api.line.me/v2/bot/message/reply', replyMessage, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`
          }
        });
      } catch (error) {
        console.error('LINE返信エラー:', error.response?.data || error.message);
      }
    }
  });

  res.sendStatus(200); // LINEに「受け取ったよ」と返す
});

app.get('/', (req, res) => {
  res.send('LINE査定Botサーバー稼働中！🚀');
});

app.listen(port, () => {
  console.log(`✅ サーバー起動！ポート番号: ${port}`);
});
