require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai')
const Response = require('./models/Response');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ База данных: СИНХРОНИЗИРОВАНО'))
  .catch(err => console.error('❌ База данных: ОШИБКА СВЯЗИ', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

// Роут для приема ответов
app.post('/submit', async (req, res) => {
    try {
        // Ожидаем, что фронт пришлет { results: [...] }
        const newResponse = new Response({
            results: req.body.results
        });
        
        await newResponse.save();
        res.json({ success: true, message: "DATA_STORED_IN_VOID" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "CRITICAL_SERVER_ERROR" });
    }
});

// Роут для просмотра результатов (Секретный)
app.get('/protocol-results', async (req, res) => {
    const { pass } = req.query;
    
    // Проверка пароля из .env
    if (pass !== process.env.ADMIN_PASSWORD) {
        return res.status(403).send("ACCESS_DENIED: INVALID_ENCRYPTION_KEY");
    }

    try {
        // Получаем все ответы, сортируем: новые вверху
        const allResponses = await Response.find().sort({ syncDate: -1 });
        res.render('admin', { responses: allResponses });
    } catch (err) {
        res.status(500).send("DATABASE_FETCH_ERROR");
    }
});

// Дополнительно: удаление записи (если нужно почистить тесты)
app.post('/delete-response/:id', async (req, res) => {
    const { pass } = req.query;
    if (pass !== process.env.ADMIN_PASSWORD) return res.status(403).send("DENIED");
    
    await Response.findByIdAndDelete(req.params.id);
    res.redirect(`/protocol-results?pass=${pass}`);
});

app.post('/analyze/:id', async (req, res) => {
    const { pass } = req.query;
    if (pass !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ success: false, error: "ACCESS_DENIED" });
    }

    try {
        const data = await Response.findById(req.params.id);
        if (!data) return res.status(404).json({ error: "NOT_FOUND" });

        const userAnswers = data.results.map((item, i) => `${i+1}. ${item.q}: ${item.a}`).join('\n');

        // Улучшенный промпт
        const prompt = `Ты — бортовой компьютер системы DEEP_SCAN. 
        Проанализируй данные:
        ${userAnswers}
        
        Верни ТОЛЬКО JSON объект с полями:
        "archetype" (название из 2 слов),
        "description" (психологический портрет, 3 предложения),
        "sync_level" (процент от 0 до 100%).
        
        Никакого лишнего текста, только чистый JSON.`;

        // Добавляем параметр responseMimeType для принудительного JSON
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }]}],
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const response = await result.response;
        let text = response.text().trim();

        // Дополнительная очистка на случай, если ИИ все равно добавил кавычки или текст
        if (text.includes("```")) {
            text = text.replace(/```json|```/g, "").trim();
        }

        const analysis = JSON.parse(text);

        data.aiAnalysis = analysis;
        await data.save();

        res.json({ success: true, analysis });
    } catch (err) {
        console.error("AI_ERROR:", err);
        res.status(500).json({ success: false, error: "CRITICAL_DECRYPTION_FAILURE" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 PROTOCOL_RUNNING: http://localhost:${PORT}`));
