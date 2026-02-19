gsap.registerPlugin(TextPlugin);

const questions = [
    { id: "S_01", text: "Как часто ты думаешь о нашем общении без повода?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_02", text: "Если я исчезну на неделю, что ты почувствуешь первым?", type: "text" },
    { id: "S_03", text: "Выбери три слова, описывающие нашу связь:", type: "checkbox", options: ["Хаос", "Уют", "Интрига", "Сложность", "Свобода", "Зависимость"] },
    { id: "S_04", text: "Насколько сильно я влияю на твое настроение?", type: "range", min: 0, max: 100, unit: "dB" },
    { id: "S_05", text: "Мы — это...", type: "checkbox", options: ["Случайность", "Судьба", "Любовь", "Ошибка", "Удача", "Эксперимент"] },
    { id: "S_06", text: "Есть ли песня, которая ассоциируется только со мной?", type: "text" },
    { id: "S_07", text: "Твое желание обнять меня прямо сейчас?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_08", text: "Что в моем поведении тебя больше всего смущает?", type: "text" },
    { id: "S_09", text: "Ты представляла/видишь наше будущее через год?", type: "checkbox", options: ["Да", "Нет", "Страшно думать", "Постоянно"] },
    { id: "S_10", text: "Уровень химии между нами по твоим ощущениям:", type: "range", min: 0, max: 100, unit: "V" },
    { id: "S_11", text: "Если бы мы были в кино, какой это был бы жанр?", type: "text" },
    { id: "S_12", text: "Что важнее в наших отношениях?", type: "checkbox", options: ["Разговоры", "Молчание", "Действия", "Поддержка"] },
    { id: "S_13", text: "Твоя готовность пойти на риск ради меня?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_14", text: "Опиши мой характер одним словом:", type: "text" },
    { id: "S_15", text: "В чем наша главная слабость?", type: "text" },
    { id: "S_16", text: "Ревность - это признак чего?", type: "text" },
    { id: "S_17", text: `Насколько я "твой" человек?`, type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_18", text: "Цвет нашей вчерашней беседы?", type: "checkbox", options: ["Черный", "Белый", "Серый", "Прозрачный"] },
    { id: "S_19", text: "Что ты скрываешь от меня чаще всего?", type: "text" },
    { id: "S_20", text: "Если бы ты могла стереть один наш момент из памяти, какой бы это был?", type: "text" }, // ЗАМЕНА
    { id: "S_21", text: "Если я вопрос, то какой ты ответ?", type: "text" },
    { id: "S_22", text: "Что ты чувствуешь, когда я долго не пишу?", type: "checkbox", options: ["Тревогу", "Покой", "Скуку", "Ожидание"] },
    { id: "S_23", text: "Твой самый большой страх в контексте нашего общения?", type: "text" }, // ЗАМЕНА
    { id: "S_24", text: "Мы встретились вовремя?", type: "text" },
    { id: "S_25", text: "Что бы ты изменила во мне в первую очередь?", type: "text" },
    { id: "S_26", text: "Какое приключение ты хочешь пережить со мной?", type: "text" },
    { id: "S_27", text: "Насколько ты честна в этом тесте?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_28", text: "Я для тебя - это...", type: "checkbox", options: ["Спокойствие", "Добро", "Вызов", "Убежище (не уебище)"] },
    { id: "S_29", text: "Оцени теплоту наших встреч:", type: "range", min: 0, max: 100, unit: "°C" },
    { id: "S_30", text: "Твое самое яркое воспоминание обо мне?", type: "text" },
    { id: "S_31", text: "Ты доверяешь мне свои секреты?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_32", text: "Что заставляет тебя улыбаться при встрече со мной?", type: "text" },
    { id: "S_33", text: "Главное качество во мне для тебя?", type: "checkbox", options: ["Юмор", "Интеллект", "Сила", "Странность"] },
    { id: "S_34", text: "Если бы мы были стихиями, то какими?", type: "text" },
    { id: "S_35", text: "Твой уровень зависимости от нашего общения?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_36", text: "Что важнее: быть правой или быть со мной?", type: "text" },
    { id: "S_37", text: "Как часто ты пересматриваешь наши переписки?", type: "range", min: 0, max: 100, unit: "f" },
    { id: "S_38", text: "Выбери наш девиз:", type: "checkbox", options: ["Против всех", "Вместе к цели", "Здесь и сейчас"] },
    { id: "S_39", text: "Какое слово я использую слишком часто? (по твоему мнению)", type: "text" },
    { id: "S_40", text: "Какой жест с моей стороны заставляет твое сердце биться быстрее?", type: "text" }, // ЗАМЕНА
    { id: "S_41", text: "Ты боишься меня потерять?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_42", text: "Если этот тест последний шанс что-то сказать, что напишешь?", type: "text" },
    { id: "S_43", text: "Я - твой друг или больше?", type: "checkbox", options: ["Друг", "Больше", "Сложно сказать", "Все сразу"] },
    { id: "S_44", text: "Глубина нашего понимания без слов?", type: "range", min: 0, max: 100, unit: "m" },
    { id: "S_45", text: "Ты готова открыть мне свою темную сторону?", type: "text" },
    { id: "S_46", text: "Что ты сделаешь, если я совершу глупость?", type: "text" },
    { id: "S_47", text: "Твой уровень счастья в моменте рядом со мной?", type: "range", min: 0, max: 100, unit: "%" },
    { id: "S_48", text: "Твое внутреннее состояние прямо сейчас, глядя на этот экран?", type: "text" }, // ЗАМЕНА
    { id: "S_49", text: "Ты меня любишь?", type: "text" },
    { id: "S_50", text: "ТОЧНО?", type: "range", min: 0, max: 100, unit: "DONE" }
];

let currentIndex = 0;
const results = [];

const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function updateCursor() {
    gsap.set('.cursor-main', { x: mouse.x, y: mouse.y });
    gsap.to('.cursor-outline', { x: mouse.x, y: mouse.y, duration: 0.15 });
    requestAnimationFrame(updateCursor);
}
updateCursor();

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    gsap.fromTo(".transition-flash", { scaleY: 0 }, { scaleY: 1, duration: 0.2, yoyo: true, repeat: 1 });
}

function startAdvancedQuiz() {
    gsap.to(".intro-sequence", { opacity: 0, y: -20, duration: 0.4, onComplete: renderQuestion });
}

function handleCustomInputVisibility(checkbox) {
    const customInput = document.getElementById('custom-answer-input');
    if (checkbox.checked && checkbox.value === 'CUSTOM_FIELD') {
        customInput.style.display = 'block';
        customInput.focus();
    } else if (!checkbox.checked && checkbox.value === 'CUSTOM_FIELD') {
        customInput.style.display = 'none';
    }
}

function renderQuestion() {
    if (currentIndex >= questions.length) {
        showFinal();
        return;
    }

    const q = questions[currentIndex];
    const container = document.getElementById('quiz-content');
    
    document.getElementById('sync-progress').innerText = Math.floor((currentIndex / questions.length) * 100);
    document.getElementById('stage-counter').innerText = `${currentIndex + 1}/50`;

    let inputHTML = '';
    if (q.type === 'range') {
        inputHTML = `
            <div class="range-value" id="rv">${Math.floor(q.max/2)}${q.unit}</div>
            <input type="range" class="cyber-range" min="${q.min}" max="${q.max}" value="${Math.floor(q.max/2)}" 
                oninput="document.getElementById('rv').innerText = this.value + '${q.unit}'" id="q-ans">
        `;
    } else if (q.type === 'checkbox') {
        inputHTML = `<div class="checkbox-group">
            ${q.options.map(opt => `
                <label class="cb-container">${opt}
                    <input type="checkbox" name="cb" value="${opt}">
                    <span class="checkmark"></span>
                </label>
            `).join('')}
            <label class="cb-container">* СВОЙ ОТВЕТ...
                <input type="checkbox" name="cb" value="CUSTOM_FIELD" onchange="handleCustomInputVisibility(this)">
                <span class="checkmark"></span>
            </label>
            <input type="text" id="custom-answer-input" class="mega-input" style="display:none; margin-top:10px; font-size:10px;" placeholder="ВВЕДИТЕ ВАШ ВАРИАНТ">
        </div>`;
    } else {
        inputHTML = `<input type="text" class="mega-input" id="q-ans" placeholder="[ ВВОД ДАННЫХ ]" autocomplete="off">`;
    }

    container.innerHTML = `
        <div class="q-card">
            <div class="q-title">${q.id} // POLL</div>
            <div class="q-text" id="typewriter"></div>
            ${inputHTML}
            <button class="mega-btn" onclick="nextStep()">ПОДТВЕРДИТЬ</button>
        </div>
    `;

    gsap.to("#typewriter", { text: q.text, duration: 0.8, ease: "none" });
    if(q.type === 'text') setTimeout(() => document.getElementById('q-ans').focus(), 200);
}

function nextStep() {
    const q = questions[currentIndex];
    let answer;
    
    if (q.type === 'checkbox') {
        answer = Array.from(document.querySelectorAll('input[name="cb"]:checked')).map(el => {
            if (el.value === 'CUSTOM_FIELD') {
                return "Свой ответ: " + document.getElementById('custom-answer-input').value;
            }
            return el.value;
        });
    } else {
        answer = document.getElementById('q-ans').value;
    }

    if (!answer || (Array.isArray(answer) && answer.length === 0) || (typeof answer === 'string' && answer.trim() === "")) {
        gsap.to(".q-card", { x: [-10, 10, 0], duration: 0.2 });
        return;
    }

    results.push({ q: q.text, a: answer });
    currentIndex++;
    gsap.to(".q-card", { opacity: 0, x: 20, duration: 0.3, onComplete: renderQuestion });
}

async function showFinal() {
    const container = document.getElementById('quiz-content');
    container.innerHTML = `
        <div class="q-card terminal-style" style="background: var(--text); color: var(--bg);">
            <div class="glitch-title" data-text="POLL_COMPLETE">POLL_COMPLETE</div>
            <div class="line-separator" style="background: var(--bg); width: 100%;"></div>
            <p id="final-txt" style="font-size: 10px; line-height: 2;"></p>
            <div id="upload-status" style="font-size: 8px; margin-top: 20px; opacity: 0.5;">PREPARING_DATA_TRANSFER...</div>
        </div>
    `;

    const msg = "Система проанализировала 50 твоих ответов. Результаты сохранены и отправились мне. Спасибо зайка <3";
    gsap.to("#final-txt", { text: msg, duration: 4, ease: "none" });

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ results: results })
        });

        const data = await response.json();

        if (data.success) {
            document.getElementById('upload-status').innerText = "STATUS: DATA_SENT_SUCCESSFULLY";
            gsap.to("#upload-status", { color: "#00ff00", duration: 0.5 });
        } else {
            throw new Error("Upload failed");
        }
    } catch (err) {
        console.error("Ошибка при отправке:", err);
        document.getElementById('upload-status').innerText = "STATUS: TRANSFER_ERROR_BUT_LOCAL_SYNC_OK";
        document.getElementById('upload-status').style.color = "red";
    }
}

const canvas = document.getElementById('scribble-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Line {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.v = { 
            x: (Math.random() * 3 - 1.5), 
            y: (Math.random() * 3 - 1.5) 
        };
        this.history = [];
        this.maxLength = 30 + Math.random() * 50; 
    }
    draw() {
        this.x += this.v.x; 
        this.y += this.v.y;

        if(this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }

        this.history.push({x: this.x, y: this.y});
        if(this.history.length > this.maxLength) this.history.shift();

        ctx.beginPath();
        ctx.lineWidth = 2; 
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--text');
        
        this.history.forEach((p, i) => {
            if(i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
    }
}

const lines = Array.from({length: 20}, () => new Line());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(l => l.draw());
    requestAnimationFrame(animate);
}
animate();