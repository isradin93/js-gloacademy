'use strict';

const money = +prompt('Ваш месячный доход?'),
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,
    period = 7,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

const getExpensesMonth = function() {
    return amount1 + amount2;
};

const getAccumulatedMonth = function() {
    return money - getExpensesMonth();
};

const accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
};

const budgetDay = Math.floor(accumulatedMonth / 30);

const showTypeOf = function(data) {
    return typeof data;
};


console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Расходы за месяц: ' + getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
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