// initializing variables 
let title = document.querySelector('.expenseTitle');
let category = document.querySelector('.category');
let expense = document.querySelector('.expenseInput');
let date = document.querySelector('.date');
let hist = document.querySelector('.userEntries');
let dummy = document.querySelector('.dummy');
var finalExpense = '';
let entryCount = 0;

// prompting the budget
var Balance = parseInt(prompt("SET BUDGET HERE!"));
while(Balance<=0){
    alert("Please Enter a Positive Balance");
    Balance = parseInt(prompt("SET BUDGET HERE!"));
}
document.querySelector('.blcAmount').innerText = Balance;
document.querySelector('#budget').innerText=Balance;

// expenseHTML = JSON.parse(localStorage.getItem('history'))|| [];
// history();
saveCalculation();

// JSON.parse(localStorage.getItem('finalExpense'))||

function findInput() {
    const inputElement = document.querySelector('.expenseInput').value;
    // const expense = inputElement.value;
    saveCalculation();
    return inputElement;
};

function changeBalance() {
    Balance = eval(Balance + '-' + findInput());
    document.querySelector('.blcAmount').innerText = Balance;
}

function addExpense() {
    const newexpense = findInput();
    const newcal = finalExpense + '+' + newexpense;
    var answer = eval(newcal);
    saveCalculation();
    return answer; 
};

function showAnswer() {
    finalExpense = addExpense();
    document.querySelector('.expenseValue').innerText = finalExpense;
    saveCalculation();
};

// function saveCalculation(){
//     localStorage.setItem('finalExpense',finalExpense);
//     localStorage.setItem('Balance',Balance);
//     localStorage.setItem('expenseHTML',expenseHTML);
// };

// let expenseHTML = JSON.parse(localStorage.getItem('history'))|| [];
function history() {
    const html = `
                <div id="entry">
                    <div class="entryContent">
                        <div class="rightEntry">
                        <h3 id="entryTitle"> ${title.value} </h3>
                        <h4 id="entryCategory"> ${category.value} </h4>
                        </div>

                        <div class="leftEntry">
                        
                        <h3 id="entryAmount">Rs ${expense.value}</h3>
                        <p id="entryDate">${date.value}</p>
                        
                        
                        </div>
                        
                    </div>
                </div>
                `;
    dummy.innerHTML="";             
    const entry = document.createElement('div');
    entry.innerHTML = html;
    hist.insertBefore(entry,hist.firstChild);
    entryCount++;
    // document.querySelector('.history').innerHTML += html;
    emptyInput();
    saveCalculation();
}

function saveCalculation(){
    localStorage.setItem('finalExpense',finalExpense);
    localStorage.setItem('Balance',Balance);
};

function emptyInput(){
    title.focus()
    title.value="";
    category.value="";
    expense.value="";
    date.value="";
}

