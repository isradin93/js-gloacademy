'use strict';

const salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.getElementsByClassName('income-items'),
    incomePlus = document.querySelector('.income_add'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.getElementsByClassName('expenses-items'),
    expensesPlus = document.querySelector('.expenses_add'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositCheckbox = document.querySelector('#deposit-check'),
    depositBank = document.querySelectorAll('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodАmount = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    startBtn = document.getElementById('start'),
    resetBtn = document.getElementById('cancel');

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
    income: {},
    addIncome: [],
    expenses: [],
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0,
    expensesMonth: 0,
    start: function() {
        appData.budget = +salaryAmount.value;

        appData.getIncome();
        appData.getExpenses();
        appData.getAddIncome();
        appData.getAddExpenses();
        appData.getIncomeMonth();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.showResults();
    },
    showResults: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalIncomeValue.value = appData.addIncome.join(', ');
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].after(cloneIncomeItems);
        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    addExpensesBlock: function() {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].after(cloneExpensesItems);
        cloneExpensesItems.children[0].value = '';
        cloneExpensesItems.children[1].value = '';
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getIncome: function() {
        for (const item of incomeItems) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        }
    },
    getExpenses: function() {
        for (const item of expensesItems) {
            let itemExpense = item.querySelector('.expenses-title').value;
            let cashExpense = item.querySelector('.expenses-amount').value;
            if (itemExpense !== '' && cashExpense !== '') {
                appData.expenses[itemExpense] = cashExpense;
            }
        }
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getIncomeMonth: function() {
        for (const key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getExpensesMonth: function() {
        for (const key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = (appData.budget + appData.incomeMonth) - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        let targetMonthResult = Math.ceil(targetAmount.value / appData.budgetMonth);
        if (targetMonthResult <= 0) {
            return 'Цель не будет достигнута';
        }
        return targetMonthResult;
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
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', function() {
    periodАmount.textContent = periodSelect.value;
});
startBtn.addEventListener('click', function() {
    if (salaryAmount.value === '') {
        return;
    } else {
        appData.start();
    }
});