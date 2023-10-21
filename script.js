// initializing variables 
let title = document.querySelector('.expenseTitle');
let category = document.querySelector('.category');
let expense = document.querySelector('.expenseInput');
let date = document.querySelector('.date');
let hist = document.querySelector('.userEntries');
let dummy = document.querySelector('.dummy');
var totalExpense = 0;
let entryCount = 0;

// prompting the budget
var Balance = parseInt(prompt("SET BUDGET HERE!"));
while(Balance<=0){
    alert("Please Enter a Positive Balance");
    Balance = parseInt(prompt("SET BUDGET HERE!"));
}
document.querySelector('.blcAmount').innerText = Balance;
document.querySelector('#budget').innerText = Balance;

// expenseHTML = JSON.parse(localStorage.getItem('history'))|| [];
// history();

// JSON.parse(localStorage.getItem('finalExpense'))||

function findInput() {
    const inputElement = document.querySelector('.expenseInput').value;
    // const expense = inputElement.value;
    return inputElement;
};

function changeBalance() {
    Balance = eval(Balance + '-' + findInput());
    document.querySelector('.blcAmount').innerText = Balance;
}

function addExpense() {
    const newexpense = findInput();
    const newcal = totalExpense + '+' + newexpense;
    totalExpense = eval(newcal);
    document.querySelector('.expenseValue').innerText = totalExpense;
};


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
}

function updateProgressBar(){
    let progressSpent = parseInt((totalExpense/Balance)*100);
    document.querySelector('.progress-bar').style.background = "";
    document.querySelector('.progress-bar').style.background = 
    `radial-gradient(closest-side, black 79%, transparent 80%),conic-gradient(#720e9e ${progressSpent}%, white 0); `
}

function emptyInput(){
    title.focus()
    title.value="";
    category.value="";
    expense.value="";
    date.value="";
}

