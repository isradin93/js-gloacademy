'use strict';

const money = 70000,
    income = 'Фриланс',
    addExpenses = 'Интернет, Такси, Квартира',
    deposit = false,
    mission = 200000,
    period = 7,
    budgetDay = money / 30;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split());
console.log(budgetDay.toFixed());