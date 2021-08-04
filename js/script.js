window.addEventListener('DOMContentLoaded', () => {
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
        depositBank = document.querySelector('.deposit-bank'),
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
    let textInputs = document.querySelectorAll('[type="text"]');

    const isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    class AppData {
        constructor() {
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
        }
        start() {
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
            this.getInfoDeposit();
            this.getBudget();
            this.showResults();
        }
        showResults() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalIncomeValue.value = this.addIncome.join(', ');
            additionalExpensesValue.value = this.addExpenses.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            periodSelect.addEventListener('input', () => {
                incomePeriodValue.value = this.calcPeriod();
            });
        }
        addIncomeBlock() {
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].after(cloneIncomeItems);
            cloneIncomeItems.children[0].value = '';
            cloneIncomeItems.children[1].value = '';
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        }
        addExpensesBlock() {
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
            expensesItems[0].after(cloneExpensesItems);
            cloneExpensesItems.children[0].value = '';
            cloneExpensesItems.children[1].value = '';
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        }
        getIncome() {
            for (const item of incomeItems) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== '') {
                    this.income[itemIncome] = cashIncome;
                }
            }
        }
        getExpenses() {
            for (const item of expensesItems) {
                let itemExpense = item.querySelector('.expenses-title').value;
                let cashExpense = item.querySelector('.expenses-amount').value;
                if (itemExpense !== '' && cashExpense !== '') {
                    this.expenses[itemExpense] = cashExpense;
                }
            }
        }
        getAddIncome() {
            additionalIncomeItem.forEach(item => {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            });
        }
        getAddExpenses() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            });
        }
        getIncomeMonth() {
            for (const key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        }
        getExpensesMonth() {
            for (const key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        }
        getBudget() {
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        }
        getTargetMonth() {
            let targetMonthResult = Math.ceil(targetAmount.value / this.budgetMonth);
            if (targetMonthResult <= 0) {
                return 'Цель не будет достигнута';
            }
            return targetMonthResult;
        }
        getStatusIncome() {
            if (this.budgetDay >= 1200) {
                return 'У вас высокий уровень дохода';
            } else if (600 <= this.budgetDay && this.budgetDay < 1200) {
                return 'У вас средний уровень дохода';
            } else if (0 < this.budgetDay && this.budgetDay < 600) {
                return 'К сожалению у вас уровень дохода ниже среднего';
            } else if (this.budgetDay <= 0) {
                return 'Что то пошло не так';
            }
        }
        getInfoDeposit() {
            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }
        }
        changePercent() {
            const selectValue = this.value;
            if (selectValue === 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.removeAttribute('disabled');
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectValue;
            }
        }
        depositHandler() {
            if (depositCheckbox.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
                depositPercent.addEventListener('input', () => {
                    if (depositPercent.value > 100 || depositPercent.value < 1) {
                        alert('Веденное число должно быть от 1 до 100');
                        depositPercent.value = '';
                    }
                });

            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '0';
                depositAmount.value = '';
                this.deposit = false;
                depositPercent.value = '';
                depositBank.removeEventListener('change', this.changePercent);
                depositPercent.removeEventListener('input', () => {
                    if (depositPercent.value > 100 || depositPercent.value < 1) {
                        alert('Веденное число должно быть от 1 до 100');
                        depositPercent.value = '';
                    }
                });
            }
        }
        calcPeriod() {
            return this.budgetMonth * periodSelect.value;
        }
        reset() {
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

            depositCheckbox.checked = false;
            this.depositHandler();
        }
        eventListeners() {
            incomePlus.addEventListener('click', this.addIncomeBlock);
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            periodSelect.addEventListener('input', () => {
                periodАmount.textContent = periodSelect.value;
            });
            startBtn.addEventListener('click', this.start.bind(this));
            resetBtn.addEventListener('click', this.reset.bind(this));
            depositCheckbox.addEventListener('change', this.depositHandler.bind(this));
        }
    }

    const appData = new AppData();
    appData.eventListeners();
});