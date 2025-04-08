const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// LINE Webhook からの POST を受け取るための設定
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('📩 Webhook受信:', req.body);
  res.sendStatus(200); // LINE に 200 OK を返す
});

// 動作確認用（GETでもアクセスできるように）
app.get('/', (req, res) => {
  res.send('LINE査定Botサーバー稼働中！🚀');
});
app.listen(port, () => {
    console.log(`✅ サーバー起動！ポート番号: ${port}`);
  });
  