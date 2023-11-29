import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key); 
const getUserDetails =  await database.from('users').select('walletname');
console.log(getUserDetails.data[0]);
let user_id = sessionStorage.getItem("user_id");
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);

for(let i=0;i<historyData.data.length;i++){
    let tempSrDiv = document.createElement('div');
    let tempTitleDiv = document.createElement('div');
    let tempAmountDiv = document.createElement('div');
    let tempCategoryDiv = document.createElement('div');
    let tempDateDiv = document.createElement('div');
    tempSrDiv.innerHTML = `<div class="historycolElement">${i+1+"."}</div>` 
    tempTitleDiv.innerHTML = `<div class="historycolElement">${historyData.data[i]['Title']}</div>`
    tempAmountDiv.innerHTML = `<div class="historycolElement">${'Rs '+historyData.data[i]['Amount']}</div>`
    tempCategoryDiv.innerHTML = `<div class="historycolElement">${historyData.data[i]['category']}</div>`
    tempDateDiv.innerHTML = `<div class="historycolElement">${historyData.data[i]['Date']}</div>`
    tempAmountDiv.style.color='#D22B2B';
    tempTitleDiv.style.color='#9932cc';
    document.querySelector('#serialNumber').appendChild(tempSrDiv);
    document.querySelector('#transTitle').appendChild(tempTitleDiv);
    document.querySelector('#transCategory').appendChild(tempCategoryDiv);
    document.querySelector('#transAmount').appendChild(tempAmountDiv);
    document.querySelector('#transDate').appendChild(tempDateDiv);
    tempTitleDiv.style.padding='2px 20px 2px 47px';
  
    if(i%2!=0){
      tempTitleDiv.style.backgroundColor='#1b1b1b';
      tempAmountDiv.style.backgroundColor='#1b1b1b';
      tempSrDiv.style.backgroundColor='#1b1b1b';
      tempCategoryDiv.style.backgroundColor='#1b1b1b';
      tempDateDiv.style.backgroundColor='#1b1b1b';
    }
  }
  
