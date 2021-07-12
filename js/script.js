'use strict';

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
    };

start();

const appData = {
    income: {},
    addIncome: {},
    expenses: [],
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 7,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        if ('Есть ли у вас дополнительный заработок ?') {
            let itemIncome;
            do {
                itemIncome = prompt('Есть ли у вас дополнительный заработок?');
            }
            while (!Number.isNaN(Number(itemIncome)));

            let cashIncome;
            do {
                cashIncome = prompt('Сколько вы на этом зарабатываете?');
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }

        appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = appData.addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {

            let itemExpenses;
            do {
                itemExpenses = prompt('Введите обязательную статью расходов');
            } while (!Number.isNaN(Number(itemExpenses)));

            let cashExpenses;
            do {
                cashExpenses = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(cashExpenses));

            appData.expenses[itemExpenses] = cashExpenses;
        }
    },
    getExpensesMonth: function() {
        for (const key in appData.expenses) {
            appData.expensesMonth = appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        const targetMonthResult = Math.ceil(appData.mission / appData.budgetMonth);
        if (targetMonthResult <= 0) {
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достигнута за: ' + targetMonthResult + ' месяцев';
        }
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (600 <= appData.budgetDay && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (0 < appData.budgetDay && appData.budgetDay < 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (appData.budgetDay <= 0) {
            return 'Что то пошло не так';
        }
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

const capitalizeArrToString = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i][0].toUpperCase(i) + arr[i].substring(1);
    }
    return arr.join(', ');
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('');
console.log('Наша программа включает в себя данные: ');
for (const key in appData) {
    console.log(key + ': ' + appData[key]);
}
console.log('Возможные расходы: ' + capitalizeArrToString(appData.addExpenses));