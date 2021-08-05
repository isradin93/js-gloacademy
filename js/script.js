// eslint-disable-next-line strict
'use strict';

const toLog = () => {
    const date = new Date(),
        hours = date.getHours(),
        day = date.getDay(),
        days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const greeting = () => {
        let goodDay,
            dayNow;

        if (hours >= 3 && hours < 9) {
            goodDay = 'Доброе утро';
        } else if (hours >= 9 && hours < 15) {
            goodDay = 'Добрый день';
        } else if (hours >= 15 && hours < 21) {
            goodDay = 'Добрый вечер';
        } else {
            goodDay = 'Доброй ночи';
        }

        days.forEach((item, index) => {
            if (index === day) {
                dayNow = item;
            }
        });

        return {
            goodDay,
            dayNow
        };
    };

    const toNewYear = () => {
        const newYearDate = new Date('January 1 2022').getTime(),
            nowDate = new Date().getTime(),
            timeRemaining = (newYearDate - nowDate) / 1000,
            timeRemainingDays = Math.floor(timeRemaining / 60 / 60 / 24);

        return timeRemainingDays;
    };

    const declOfNum = (n, titles) => n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

    const toHtml = () => {
        const timeString = new Date().toLocaleTimeString('en');

        document.body.innerHTML =
            `<i>${greeting().goodDay}</i><br>
	            <i>Сегодня: ${greeting().dayNow}</i><br>
	            <i>Текущее время: ${timeString}</i><br>
	            <i>До Нового Года осталось: ${declOfNum(toNewYear(), ['день', 'дня', 'дней'])} </i>
	        `;
    };

    toHtml();
    setInterval(toHtml, 1000);
};

toLog();