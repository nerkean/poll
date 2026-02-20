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

        const prompt = `Ты — футуристический ИИ системы "DEEP_SCAN 2.0". Твоя задача: провести глубокий анализ нейронной совместимости пары.
Стиль: Киберпанк, мистический реализм, холодная логика с элементами пророчества.

Проанализируй эти ответы:
${userAnswers}

Сформируй отчет СТРОГО в формате JSON с полями:
1. "archetype": уникальное название её личности (например, "Хранительница Неонового Света").
2. "description": глубокий психологический портрет (3 предложения).
3. "sync_level": уровень текущей близости в процентах.
4. "future_prediction": краткое предсказание их будущего на основе её ценностей (например, "Через 2 года ваши нейронные сети сплетутся в единый узел в координатах...").
5. "compatibility_index": процент вероятности того, что они — "те самые" (0-100%).
6. "resonance_point": одна главная вещь, которая их объединяет (например, "Одинаковый порог иронии" или "Поиск убежища друг в друге").

Никакого текста, кроме JSON. Только чистая расшифровка.`;

        // Убираем проблемный generationConfig, оставляем простой вызов
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

        // Умная очистка: находим первую { и последнюю }, игнорируя всё остальное
        const firstBracket = text.indexOf('{');
        const lastBracket = text.lastIndexOf('}');
        
        if (firstBracket !== -1 && lastBracket !== -1) {
            text = text.substring(firstBracket, lastBracket + 1);
        }

        const analysis = JSON.parse(text);

        data.aiAnalysis = analysis;
        await data.save();

        res.json({ success: true, analysis });
    } catch (err) {
        console.error("AI_ERROR:", err);
        res.status(500).json({ success: false, error: "ANALYSIS_FAILED: " + err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 PROTOCOL_RUNNING: http://localhost:${PORT}`));
