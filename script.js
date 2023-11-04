
import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  

// initializing variables 
let title = document.querySelector('.expenseTitle');
let category = document.querySelector('.category');
let expense = document.querySelector('.expenseInput');
let date = document.querySelector('.date');
let hist = document.querySelector('.userEntries');
let dummy = document.querySelector('.dummy');
let entryCount = 0;

const username = sessionStorage.getItem("user");
const budgetImport = await database.from("users").select("Budget").eq("walletname",username);
const balanceImport = await database.from("users").select("userBalance").eq("walletname",username);
const user_idImport = await database.from("users").select("user_id").eq("walletname",username);
const user_idVal = user_idImport.data[0]["user_id"];
var Balance = balanceImport.data[0]["userBalance"]; 
const BUDGET = budgetImport.data[0]["Budget"];
let totalExpense = BUDGET - Balance;
document.querySelector('.expenseValue').innerText = totalExpense;
document.querySelector("#hello").innerText="Hello, Welcome back "+username;
updateProgressBar();




document.querySelector('.blcAmount').innerText = Balance;
document.querySelector('#budget').innerText = BUDGET;
document.querySelector("#addExpense").addEventListener("click",findInput);
document.querySelector("#addExpense").addEventListener("click",changeBalance);
document.querySelector("#addExpense").addEventListener("click",addExpense);
document.querySelector("#addExpense").addEventListener("click",exportHistory);
document.querySelector("#addExpense").addEventListener("click",history);
document.querySelector("#addExpense").addEventListener("click",updateProgressBar);


// 


function findInput() {
    const inputElement = document.querySelector('.expenseInput').value;
    // const expense = inputElement.value;
    return inputElement;
};

async function changeBalance() {
    Balance = eval(Balance + '-' + findInput());
    document.querySelector('.blcAmount').innerText = Balance;
    const balanceImport = await database.from("users").update({"Balance":Balance}).eq("walletname",username);
    const updateBalance = await database.from("users").update({userBalance:Balance}).eq("walletname",username);
}

function addExpense() {
    const newexpense = findInput();
    const newcal = totalExpense + '+' + newexpense;
    totalExpense = eval(newcal);
    document.querySelector('.expenseValue').innerText = totalExpense;
};

async function exportHistory(){
    try{
         const historyExport = await database.from("ExpenseHistory").insert([
        {"user_id":user_idVal,"Amount":expense.value,"Title":title.value,"category":category.value,"Date":date.value}])
        console.log("added successfully",historyExport)
    } catch (error){
        console.error('Error adding history entry:', error);
    }   
}


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
    
    // document.querySelector('.progress-bar').style.setProperty('backgroundImage','radial-gradient(closest-side, black 79%, transparent 80%),conic-gradient(#720e9e 10%, white 0);');
    // document.querySelector('.history').innerHTML += html;

    emptyInput();
}



function updateProgressBar(){
    let expensePercentage = ((totalExpense / BUDGET ))*100;
    expensePercentage = expensePercentage.toFixed(0);
    if(expensePercentage < 10){
        let perstring = String(expensePercentage);
        console.log("yess");
        document.querySelector("#progGraphText").innerText="0"+perstring+"%";
    } else{
        document.querySelector("#progGraphText").innerText=expensePercentage+"%";
    }
    document.querySelector("#progGraphText").innerText=expensePercentage+"%";
    console.log(expensePercentage+" "+totalExpense+Balance);
    document.getElementById('progGraph').style.backgroundImage=`radial-gradient(closest-side, black 79%, transparent 80%),conic-gradient(#720e9e ${parseFloat(expensePercentage)}%, white 0)`;
}


function emptyInput(){
    title.focus()
    title.value="";
    category.value="";
    expense.value="";
    date.value="";
}

