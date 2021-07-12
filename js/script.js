'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,
    period = 7;

const start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};

start();

let expenses = [];

const getExpensesMonth = function() {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');

        let cashExpenses;
        do {
            cashExpenses = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(cashExpenses));

        sum += +cashExpenses;
    }
    return sum;
};

const expensesAmount = getExpensesMonth();

const getAccumulatedMonth = function() {
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    let targetMonthResult = Math.ceil(mission / accumulatedMonth);
    if (targetMonthResult <= 0) {
        return 'Цель не будет достигнута';
    } else {
        return 'Цель будет достигнута за: ' + targetMonthResult + ' месяцев';
    }
};

const budgetDay = Math.floor(accumulatedMonth / 30);

const showTypeOf = function(data) {
    return typeof data;
};

console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц: ' + expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());
console.log('Бюджет на день: ' + budgetDay);

const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (600 <= budgetDay && budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (0 < budgetDay && budgetDay < 600) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay <= 0) {
        return 'Что то пошло не так';
    }
};

console.log(getStatusIncome());