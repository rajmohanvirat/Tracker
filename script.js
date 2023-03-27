
const balance = document.getElementById('total-amount');
const incomeAmount = document.getElementById('inc-amt');
const expenseAmount = document.getElementById('dec-amt');
const description = document.getElementById('input-description');
const amount = document.getElementById('input-amount');
const transHistory =document.getElementById('trans');
const formSubmit = document.getElementById('input-container')
const submitBtn = document.getElementById('btn');


const localStorageTransaction = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTransaction : [];

// console.log(transactions);


function pushTransactionDetails(transaction){
  const sign = transaction.amount < 0 ? '-': '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'inp-expense' : 'inp-income');
  item.innerHTML = `
  ${transaction.desctiption}
  <span>${sign} ${Math.abs(transaction.amount)}</span>
  <button class="trans-btn"  onclick="removeTrans(${transaction.id})">X</button>
  `;
  transHistory.appendChild(item);
  // console.log(item);
  // console.log(sign);
  // console.log(transaction);
};

function removeTrans(id){
  if(confirm("You want to delete the transaction?")){
    transactions = transactions.filter((transaction) => transaction.id != id);
    config();
    updateLocalStorage();
  }else{
    return;
  } 
};

function updateAmount(){
  const amounts = transactions.map((transaction) =>
  transaction.amount);
  const total = amounts.reduce((acc, item) =>
  (acc += item), 0).toFixed(2);
  balance.innerHTML = ` ${total}`

  const income = amounts.filter((item) => item > 0).reduce((acc, item) =>
  (acc += item), 0).toFixed(2);
  incomeAmount.innerHTML = ` ${income}`;

  const expense = amounts.filter((item) => item < 0).reduce((acc, item) =>
  (acc += item), 0).toFixed(2);
  expenseAmount.innerHTML = ` ${Math.abs(expense)}`;
};

function config() {
  transHistory.innerHTML = "";
  transactions.forEach(pushTransactionDetails);
  updateAmount();
};

function addTransaction(e){
  e.preventDefault();
  if(description.value.trim() == "" || amount.value.trim() == ""){
    alert("Please Enter Description and Amount");
  }else{
    const transaction = {
      id: uniqueId(),
      desctiption: description.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    pushTransactionDetails(transaction);
    description.value = "";
    amount.value = "";
    updateAmount();
    updateLocalStorage();
  }
};

formSubmit.addEventListener('submit', addTransaction);

window.addEventListener('load', function (){
  config();
});

function updateLocalStorage(){
  localStorage.setItem("trans", JSON.stringify(transactions));
};

function uniqueId(){
  return Math.floor(Math.random() * 10000);
}