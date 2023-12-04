import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key); 
const getUserDetails =  await database.from('users').select('walletname');
console.log(getUserDetails.data[0]);
let user_id = sessionStorage.getItem("user_id");
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);

// updating waldetails values

let userData = await database.from("users").select("Budget,userBalance").eq("user_id",user_id);
let BUDGET = userData.data[0]["Budget"];
let Balance = userData.data[0]["userBalance"];
let expense = BUDGET-Balance;

document.querySelector(".budgetAmount").innerText = "Rs "+BUDGET;
document.querySelector(".expenseAmount").innerText = "Rs "+expense;
document.querySelector(".balanceAmount").innerText = "Rs " + Balance;











let historyTable = document.querySelector("#historyTable");

for(let i=0;i<historyData.data.length;i++){
    let tempRow = document.createElement('div');
    tempRow.classList.add("historyRow");
    let tempLeft = document.createElement('div');
    tempLeft.classList.add('historyLeft');
    let tempTextBox = document.createElement('div');
    tempTextBox.classList.add('historyText');
    let tempRight = document.createElement('div');
    tempRight.classList.add('historyRight');
    
    let tempTitleDiv = document.createElement('div');
    let tempAmountDiv = document.createElement('div');
    let tempCategoryDiv = document.createElement('div');
    let tempDateDiv = document.createElement('div');
    tempTitleDiv.innerHTML = `<div class="historyTitle">${historyData.data[i]['Title']}</div>`
    tempAmountDiv.innerHTML = `<div class="historyAmount">${'Rs '+historyData.data[i]['Amount']}</div>`
    tempCategoryDiv.innerHTML = `<div class="category">${historyData.data[i]['category']}</div>`
    tempDateDiv.innerHTML = `<div class="historyDate">${historyData.data[i]['Date']}</div>`
    tempAmountDiv.style.color='#D22B2B';
    tempTitleDiv.style.color='#9932cc';

   

    tempTextBox.appendChild(tempTitleDiv);
    tempTextBox.appendChild(tempCategoryDiv);
    let tempIcon = document.createElement('i');

    if(historyData.data[i]['category'].localeCompare("Snacks")==0){
      tempIcon.classList.add('fa-solid','fa-cookie-bite','historyIcon');
    } 
    else if(historyData.data[i]['category'].localeCompare("Travel")==0){
      tempIcon.classList.add('fa-solid','fa-suitcase-rolling','historyIcon');
    } 
    else if(historyData.data[i]['category'].localeCompare("Educational")==0){
      tempIcon.classList.add('fa-solid','fa-user-graduate','historyIcon');
    } 
    else if(historyData.data[i]['category'].localeCompare("Food")==0){
      tempIcon.classList.add('fa-solid','fa-utensils','historyIcon');
    } 
    else if(historyData.data[i]['category'].localeCompare("Subscriptions")==0){
      tempIcon.classList.add('fa-solid','fa-calendar','historyIcon');
    } 
    else if(historyData.data[i]['category'].localeCompare("Clothing")==0){
      tempIcon.classList.add('fa-solid','fa-shirt','historyIcon');
    } 
  
    tempLeft.appendChild(tempIcon);
    tempLeft.appendChild(tempTextBox);
    tempRow.appendChild(tempLeft);
    historyTable.appendChild(tempRow);


    tempRight.appendChild(tempAmountDiv);
    tempRight.appendChild(tempDateDiv);
    tempRow.appendChild(tempRight);
    
    

  }
  
