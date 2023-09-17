var finalExpense = '';

// JSON.parse(localStorage.getItem('finalExpense'))||

function findInput() {
    const inputElement = document.querySelector('.expenseInput');
    const expense = inputElement.value;
    saveCalculation();
    return expense;
};

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

function saveCalculation(){
    localStorage.setItem('finalExpense',finalExpense);
};