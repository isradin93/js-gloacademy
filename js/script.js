window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let salaryAmount = document.querySelector('.salary-amount'),
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
        textInputs = document.querySelectorAll('[type="text"]'),
        startBtn = document.getElementById('start'),
        resetBtn = document.getElementById('cancel');

    const isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    const AppData = function() {

        this.income = {};
        this.addIncome = [];
        this.expenses = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;
    };

    AppData.prototype.start = function() {
        if (salaryAmount.value === '') {
            return;
        }

        textInputs = document.querySelectorAll('[type="text"]');
        textInputs.forEach(input => {
            input.setAttribute('disabled', 'disabled');
        });

        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
        incomePlus.setAttribute('disabled', 'disabled');
        expensesPlus.setAttribute('disabled', 'disabled');
        periodSelect.setAttribute('disabled', 'disabled');

        this.budget = +salaryAmount.value;

        this.getIncome();
        this.getExpenses();
        this.getAddIncome();
        this.getAddExpenses();
        this.getIncomeMonth();
        this.getExpensesMonth();
        this.getBudget();
        this.showResults();
    };

    AppData.prototype.showResults = function() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalIncomeValue.value = this.addIncome.join(', ');
        additionalExpensesValue.value = this.addExpenses.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = _this.calcPeriod();
        });
    };
    AppData.prototype.addIncomeBlock = function() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].after(cloneIncomeItems);
        cloneIncomeItems.children[0].value = '';
        cloneIncomeItems.children[1].value = '';
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    };
    AppData.prototype.addExpensesBlock = function() {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].after(cloneExpensesItems);
        cloneExpensesItems.children[0].value = '';
        cloneExpensesItems.children[1].value = '';
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    };
    AppData.prototype.getIncome = function() {
        const _this = this;
        for (const item of incomeItems) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        }
    };
    AppData.prototype.getExpenses = function() {
        const _this = this;
        for (const item of expensesItems) {
            let itemExpense = item.querySelector('.expenses-title').value;
            let cashExpense = item.querySelector('.expenses-amount').value;
            if (itemExpense !== '' && cashExpense !== '') {
                _this.expenses[itemExpense] = cashExpense;
            }
        }
    };
    AppData.prototype.getAddIncome = function() {
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };
    AppData.prototype.getAddExpenses = function() {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    };
    AppData.prototype.getIncomeMonth = function() {
        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };
    AppData.prototype.getExpensesMonth = function() {
        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    };
    AppData.prototype.getBudget = function() {
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };
    AppData.prototype.getTargetMonth = function() {
        let targetMonthResult = Math.ceil(targetAmount.value / this.budgetMonth);
        if (targetMonthResult <= 0) {
            return 'Цель не будет достигнута';
        }
        return targetMonthResult;
    };
    AppData.prototype.getStatusIncome = function() {
        if (this.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (600 <= this.budgetDay && this.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (0 < this.budgetDay && this.budgetDay < 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (this.budgetDay <= 0) {
            return 'Что то пошло не так';
        }
    };
    AppData.prototype.getInfoDeposit = function() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', '10');
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    };
    AppData.prototype.calcPeriod = function() {
        return this.budgetMonth * periodSelect.value;
    };
    AppData.prototype.reset = function() {
        textInputs.forEach(function(item) {
            item.removeAttribute("disabled");
            item.value = '';
        });
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
        incomePlus.removeAttribute("disabled");
        expensesPlus.removeAttribute("disabled");
        periodSelect.removeAttribute("disabled");
        periodSelect.value = 1;
        periodАmount.textContent = periodSelect.value;
        this.income = {};
        this.addIncome = [];
        this.expenses = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;

        for (const item of incomeItems) {
            if (incomeItems.length > 1) {
                item.remove();
            } else if (incomeItems.length < 3) {
                incomePlus.style.display = 'block';
            }
        }

        for (const item of expensesItems) {
            if (expensesItems.length > 1) {
                item.remove();
            } else if (expensesItems.length < 3) {
                expensesPlus.style.display = 'block';
            }
        }
    };
    AppData.prototype.eventListeners = function() {
        incomePlus.addEventListener('click', this.addIncomeBlock);
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        periodSelect.addEventListener('input', function() {
            periodАmount.textContent = periodSelect.value;
        });
        startBtn.addEventListener('click', this.start.bind(this));
        resetBtn.addEventListener('click', this.reset.bind(this));
    };

    const appData = new AppData();

    appData.eventListeners();
});