const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    // Мы можем вытащить имя из ответов или просто хранить сессию
    syncDate: { 
        type: Date, 
        default: Date.now 
    },
    // Массив ответов, где каждый элемент — это вопрос и ответ (строка или массив)
    results: [{
        q: String,
        a: mongoose.Schema.Types.Mixed 
    }],
    // Добавим поле для общей оценки (необязательно, но круто для аналитики)
    totalQuestions: { type: Number, default: 50 }
});

module.exports = mongoose.model('Response', responseSchema);