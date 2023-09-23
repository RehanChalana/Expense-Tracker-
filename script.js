
// arsh script


var finalExpense = '';
Balance = 100000.00 ;
let expenseHTML = JSON.parse(localStorage.getItem('history'))|| [];
// history();

// JSON.parse(localStorage.getItem('finalExpense'))||

function findInput() {
    const inputElement = document.querySelector('.expenseInput');
    const expense = inputElement.value;
    saveCalculation();
    return expense;
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
    const title = document.querySelector('.expenseTitle').value;
    const category = document.querySelector('.category').value;
    const expense = document.querySelector('.expenseInput').value;
    const date = document.querySelector('.date').value;

    const html = `

                <div id="entry">
                    <div class="entryContent">
                        <div class="rightEntry">
                        <h3 id="entryTitle"> ${title} </h3>
                        <h4 id="entryCategory"> ${category} </h4>
                        </div>

                        <div class="leftEntry">
                        
                        <h3 id="entryAmount">Rs ${expense}</h3>
                        <p id="entryDate">${date}</p>
                        
                        
                        </div>
                        
                    </div>
                </div>
                `;

        expenseHTML = html;
    

    document.querySelector('.history')
        .innerHTML += expenseHTML;
    saveCalculation();
}

function saveCalculation(){
    localStorage.setItem('finalExpense',finalExpense);
    localStorage.setItem('Balance',Balance);
    localStorage.setItem('expenseHTML',expenseHTML);
};