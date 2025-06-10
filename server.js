const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Эндпоинт для обработки подписей
app.post('/api/submit', async (req, res) => {
    const { nickname, telegram } = req.body;

    // Токен вашего Telegram-бота (вставьте сюда ваш токен)
    const BOT_TOKEN = '7995519623:AAHY9GRNEk4Zvjnbg-BsoDgq-CiJv2Ck1QU'; // <--- Вставьте токен вашего бота
    // ID чата, куда отправлять сообщения (ваш Telegram ID)
    const CHAT_ID = '819188706'; // <--- Вставьте ваш Telegram ID

    const message = `Новая подпись петиции:\nНикнейм: ${nickname}\nTelegram: ${telegram}\nДата: ${new Date().toLocaleString('ru-RU')}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

module.exports = app;