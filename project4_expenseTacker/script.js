// const { dateTimeValue } = require("docx");

// Only use of the container for updating income and expense amount or update existing amount.like total income and total expense
let balanceAmt = document.getElementById('balance-amount');

let incomeAmtSummary = document.getElementById('income-amount');

let expenseSummary = document.getElementById('expense-amount');

//getting variables from the form

let transactionformEl = document.getElementById('transactionForm');

let transDescForm = document.getElementById('trans_Desc');

let transAmountForm = document.getElementById('trans_amount');

// local storage usage
let transactionList = JSON.parse(localStorage.getItem('transAmountlist')) || [];

let transactionListUI = document.getElementById('transaction-list');

transactionformEl.addEventListener('submit', addTransactions);

// console.log('Outside function ')

function addTransactions(event) {
    event.preventDefault();
    const description = transDescForm.value.trim();
    const amount = transAmountForm.value.trim();

    console.log('inside functions'+ amount.includes('-'));

    console.log(description + ' ' + amount);
    updateTransactionList(description, amount)
}
let dateNow = new Date();

function updateTransactionList(description, amount) {
    transactionListUI.innerHTML = '';
    transactionList.push({
        id: Date.now(),
        "description": description,
        "amount": amount,
        "Date": dateNow.toDateString(),
    });

    localStorage.setItem('transAmountlist', JSON.stringify(transactionList));

    showTransactionList();
}

function showTransactionList() {
    // local storage usage
    let transList = JSON.parse(localStorage.getItem('transAmountlist')) || [];

    transList.forEach(element => {
        let listEle = document.createElement('li');
        let divInList = document.createElement('div');

        divInList.innerHTML = `
        <span>${element.description}</span>
        <span>${(element.amount[0]=="-"?"-":"")+'$'+element.amount.replace('-','')}</span>
        <button type="button" class="delete-btn" aria-label="Delete transaction" onclick="DeleteFunctionality(event,${element.id})">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
        <span style="font-size: xx-small;">${element.Date}</span>
        `;
        
        divInList.classList.add('transaction-item');

        listEle.appendChild(divInList);
         if(element.amount.includes('-')){
            listEle.classList.add('transaction--expense');
        }else{
        listEle.classList.add('transaction--income')}
       
        transactionListUI.appendChild(listEle);
    });


}

function DeleteFunctionality(eve, index) {
    eve.preventDefault();
    console.log(eve);
    console.log(eve.id);
    console.log(index);

    // event.preventDefault();
    // console.log('Before deleted item list:'+typeof (transactionList));
    // console.log(transactionList);
    // console.log("In delete functionality deleted item"+ index);
    
    transactionList.toArray.splice(index,1);
    console.log(transactionList);
    localStorage.setItem("transAmountlist", JSON.stringify(transactionList)); // Update storage
    showTransactionList(); // Update UI
}

function BalanceIncomeExpenseSummaryUpdate() {

}
showTransactionList();