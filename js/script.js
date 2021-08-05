'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const getUserNumber = function(str) {
    const n = prompt(str);
    if (isNumber(n)) {
        return +n;
    } else if (n === null) {
        return null;
    } else {
        getUserNumber('Пожалуйста повторите ввод');
    }
};

const getRandomNumber = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

const result = function(min, max) {
    let botNumber = getRandomNumber(min, max);
    console.log('botNumber: ', botNumber);

    function guessNumber() {
        let userNumber = getUserNumber('Угадай число от ' + min + ' - ' + max);
        console.log('userNumber: ', userNumber);
        if (userNumber === null) {
            alert('Выходим');
        } else if (userNumber < botNumber) {
            alert('Загаданное число больше');
            return guessNumber();
        } else if (userNumber > botNumber) {
            alert('Загаданное число меньше');
            return guessNumber();
        } else if (userNumber === botNumber) {
            alert('Наши поздравления! Число верно!');
        }
    }
    return guessNumber();
};

result(1, 100);