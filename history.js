import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key); 
const getUserDetails =  await database.from('users').select('walletname');
console.log(getUserDetails.data[0]);
let user_id = sessionStorage.getItem("user_id");
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);

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
    tempIcon.classList.add('fa-solid','fa-user','historyIcon');
    tempLeft.appendChild(tempIcon);
    tempLeft.appendChild(tempTextBox);
    tempRow.appendChild(tempLeft);
    historyTable.appendChild(tempRow);


    tempRight.appendChild(tempAmountDiv);
    tempRight.appendChild(tempDateDiv);
    tempRow.appendChild(tempRight);
    
    

  }
  
