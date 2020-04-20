let log = console.log;

const histories = {
    Ox7: 'Документация (Великая Летопись, отрывок): “Решение принято! Через 10 циклов мы покидаем планету Проксима Б и летим к планете Земля, чтобы сделать ее своим новым домом. Благодаря информации с зонда “Вояджер” мы сделали вывод, что планета пригодна для терраформирования и дальнейшего обитания на ней. Планета будет терраформирована, атмосфера очищена от посторонних газов и насыщена водородом. Местная цивилизация (если переживет стадию терраформирования) будет обращена в рабство во славу конунга Харальда. 21 межзвездная ладья, оснащенная лучшими двигателями на основе Печей Темной Материи, достигнет планеты Земля ориентировочно через 10 лет после старта. Да помогут нам боги!”',
    Jk3: 'Новости (Сообщения глашатаев конунга Альвгера): Черная дыра, возникшая на месте нашей звезды Проксима Центавра, серьезно изменила планету, дольше здесь оставаться нельзя. Радиоактивное излучение черной дыры постепенно и методично уничтожает все живое на планете, вплоть до микроорганизмов. Если бы не убежища и не разработанные в срочном порядке препараты от радиации усиленного действия, мы бы все давно уже погибли. Мы должны покинуть планету как можно скорее и найти новое убежище, где мы сможем поселить наш народ. Тинг решит, куда мы направимся и как скоро сможем снарядить межзвезные ладьи.',
    Sp4: 'Новости (Срочное сообщение, переданное глашатаями конунгов Харальда и Альвгера на оба континента, а также и птичьей почтой во все концы обитаемого мира): Катастрофа! Ученые мужи объединенной межзвезной лаборатории обнаружили, что излишки гравитонов от печей темной материи, которые мы столько лет бездумно выбрасывали в космос, скопились в критическую массу и вызвали коллапс звезды Проксима Центавра, превратив ее в Черную дыру. Радиоактивное излучение Черной дыры достигнет поверхности планеты в ближайшее время. Прогнозируемые последствия: все живое на поверхности, вероятно, будет немедленно или постепенно уничтожено. Главная цель: построить бункеры и разработать лекарства от радиации.'
};

let glossary = 0;

const glossaryBound = { // сопоставление кол-во словарей => Х из 50 слов русское
    0: 0,
    1: 1,
    2: 3,
    3: 5,
    4: 10,
    5: 15,
    6: 20,
    7: 25,
    8: 30,
    9: 40,
    10: 50
};

let oldHistory = {};

const alienLang = ['@', '#', '$', '^', '&', '*', '{}', '?'];

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function cleanStr(str) {
    return str.trim().replace(/ +/g, ' ');
}

function getAlienWord() {
    let length = Math.round(getRandom(3, 10));
    let word = '';
    for(let i = 1; i <= length; i++) {
        word += alienLang[Math.floor(getRandom(0, alienLang.length))];
    }
    return word;
}

function* getWords(id) {
    let text = cleanStr(histories[id]) + ' ';
    let start = 0; // начало каретки
    let current = text.indexOf(' ', start); // положение каретки в конце слова
    let ourWords = glossaryBound[glossary];
    let totalWords = 50;

    while(current !== -1) {
        if (totalWords === ourWords) {
            yield text.substr(start, current - start);
            ourWords--;
        }else if(ourWords !== 0 && Math.round(Math.random())) {
            yield text.substr(start, current - start);
            ourWords--;
        }else {
            yield getAlienWord()
        }

        start = current + 1;
        current = text.indexOf(' ', start);
        totalWords--;
        if(totalWords === 0) {
            totalWords = 50;
            ourWords = glossaryBound[glossary];
        }
    }
}

function getHistoryWithGlosssary(id) {
    if(oldHistory.hasOwnProperty(id)) {
        return oldHistory[id]
    }
    let history = '';
    for(let word of getWords(id)){
        history += word + ' ';
    }
    oldHistory[id] = history;
    return history;
}

function scientist(io, socket) {

    socket.on('getHistory', id => {
        let history = '';
        if(histories.hasOwnProperty(id)) {
            history = getHistoryWithGlosssary(id);
        }
        io.emit('setHistory', history);
    });

    socket.on('setGlossary', data => {
        if(data !== null) {
            glossary = data;
            oldHistory = {};
        }
        io.emit('getGlossary', glossary);
    })
}

module.exports = scientist;