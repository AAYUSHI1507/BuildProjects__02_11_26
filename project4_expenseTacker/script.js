const STORAGE_KEY = 'transAmountlist';

const balanceAmt = document.getElementById('balance-amount');
const incomeAmtSummary = document.getElementById('income-amount');
const expenseSummary = document.getElementById('expense-amount');

const transactionformEl = document.getElementById('transactionForm');
const transDescForm = document.getElementById('trans_Desc');
const transAmountForm = document.getElementById('trans_amount');
const transactionListUI = document.getElementById('transaction-list');

let transactionList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

transactionformEl.addEventListener('submit', addTransactions);
transactionListUI.addEventListener('click', handleListClick);

function addTransactions(event) {
    event.preventDefault();
    const description = transDescForm.value.trim();
    const amount = transAmountForm.value.trim();
    const amountNum = parseFloat(amount);

    // Reject empty description, non-numeric or zero amounts
    if (!description || isNaN(amountNum) || amountNum === 0) {
        showNotification('Please enter a valid description and a non-zero amount', 'error');
        return;
    }

    // Expense must not exceed the current balance
    if (amountNum < 0 && Math.abs(amountNum) > getCurrentBalance()) {
        showNotification('Not enough balance', 'error');
        return;
    }

    updateTransactionList(description, amount);
    BalanceIncomeExpenseSummaryUpdate();
    transactionformEl.reset();
    showNotification('The transaction is successfully added', 'success');
}

function getCurrentBalance() {
    const total = transactionList.reduce((sum, ele) => sum + (parseFloat(ele.amount) || 0), 0);
    return Math.round(total * 100) / 100; // avoid float errors like 0.1 + 0.2
}

function showNotification(message, type) {
    let toast = document.getElementById('notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'notification';
        toast.setAttribute('role', 'alert');
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `notification notification--${type} notification--show`;
    clearTimeout(showNotification.timer);
    showNotification.timer = setTimeout(() => toast.classList.remove('notification--show'), 3000);
}

function updateTransactionList(description, amount) {
    transactionList.push({
        id: Date.now(),
        description,
        amount,
        Date: new Date().toDateString(),
    });

    saveTransactions();
    showTransactionList();
}

function showTransactionList() {
    transactionListUI.innerHTML = '';

    transactionList.forEach(element => {
        const isExpense = element.amount.startsWith('-');

        const listEle = document.createElement('li');
        listEle.classList.add(isExpense ? 'transaction--expense' : 'transaction--income');

        const divInList = document.createElement('div');
        divInList.classList.add('transaction-item');
        divInList.innerHTML = `
            <span></span>
            <span>${isExpense ? '-' : ''}$${element.amount.replace('-', '')}</span>
            <button type="button" class="delete-btn" aria-label="Delete transaction" data-id="${element.id}">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <span style="font-size: xx-small;">${element.Date}</span>
        `;
        // textContent keeps user-entered text from being parsed as HTML
        divInList.firstElementChild.textContent = element.description;

        listEle.appendChild(divInList);
        transactionListUI.appendChild(listEle);
    });
}

function handleListClick(event) {
    const deleteBtn = event.target.closest('.delete-btn');
    if (deleteBtn) {
        DeleteFunctionality(Number(deleteBtn.dataset.id));
    }
}

function DeleteFunctionality(id) {
    transactionList = transactionList.filter(ele => ele.id !== id);
    saveTransactions();
    BalanceIncomeExpenseSummaryUpdate();
    showTransactionList();
}

function saveTransactions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactionList));
}

function BalanceIncomeExpenseSummaryUpdate() {
    let incomeArr = [];
    let expenseArr = [];

    transactionList.forEach(ele => {
        const value = parseFloat(ele.amount);
        if (isNaN(value)) return; // skip corrupted entries
        if (value < 0) {
            expenseArr.push(Math.abs(value));
        }
        else {
            incomeArr.push(value);
        }

    })
    let totalIncome = incomeArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, 0
        );

        let totalExpense = expenseArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, 0
        );

        incomeAmtSummary.textContent = '$'+ totalIncome.toFixed(2);

        expenseSummary.textContent = '$'+totalExpense.toFixed(2);

        TotalbalanceUpdate(totalIncome,totalExpense)
    
}

function TotalbalanceUpdate(income,expense) {
    let balance = income - expense;
    balanceAmt.textContent = (balance < 0 ? '-$' : '$') + Math.abs(balance).toFixed(2);
}
BalanceIncomeExpenseSummaryUpdate();
showTransactionList();
