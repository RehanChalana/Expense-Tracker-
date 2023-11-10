
import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const username = sessionStorage.getItem("user");



//making the daily weekly yearly clickable 
const daily = document.querySelector("#daily");
const weekly = document.querySelector("#weekly");
const monthly = document.querySelector("#monthly");

daily.addEventListener("click",selectDaily);
weekly.addEventListener("click",selectWeekly);
monthly.addEventListener("click",selectMonthly);
let dailyAfter = document.styleSheets[0].cssRules[17];
let weeklyAfter = document.styleSheets[0].cssRules[20];
let monthlyAfter = document.styleSheets[0].cssRules[22];
function selectDaily(){
  dailyAfter.style.width="95%";
  weeklyAfter.style.width="0%";
  monthlyAfter.style.width="0%";
  daily.style.opacity="1";
  daily.style.fontSize="50px"; 
  weekly.style.opacity="0.6";
  weekly.style.fontSize="40px";
  monthly.style.opacity="0.6";
  monthly.style.fontSize="40px";
}

function selectWeekly(){
  weeklyAfter.style.width="95%";
  monthlyAfter.style.width="0%";
  dailyAfter.style.width="0%";
  weekly.style.opacity="1";
  weekly.style.fontSize="50px"; 
  daily.style.fontSize="40px";
  daily.style.opacity="0.6";
  monthly.style.fontSize="40px";
  monthly.style.opacity="0.6";
}

function selectMonthly(){
  monthlyAfter.style.width="95%";
  dailyAfter.style.width="0%";
  weeklyAfter.style.width="0%";
  monthly.style.opacity="1";
  monthly.style.fontSize="50px";
  weekly.style.opacity="0.6";
  weekly.style.fontSize="40px";
  daily.style.opacity="0.6"
  daily.style.fontSize="40px";
}






// updating the progress graph
const budgetImport = await database.from("users").select("Budget").eq("walletname",username);
const balanceImport = await database.from("users").select("userBalance").eq("walletname",username);
var Balance = balanceImport.data[0]["userBalance"]; 
const BUDGET = budgetImport.data[0]["Budget"];
let totalExpense = BUDGET - Balance;
let expensePercentage = ((totalExpense / BUDGET ))*100;
expensePercentage = expensePercentage.toFixed(0);
const progGraph = document.querySelector("#progGraph");
if(expensePercentage < 10){
  let perstring = String(expensePercentage);
  document.querySelector("#progGraphText").innerText="0"+perstring+"%";
} else{
  document.querySelector("#progGraphText").innerText=expensePercentage+"%";
}
document.getElementById('progGraph').style.backgroundImage=`radial-gradient(closest-side, black 79%, transparent 80%),conic-gradient(#720e9e ${parseFloat(expensePercentage)}%, white 0)`;




// ploting the main graph! day wise
let user_id = sessionStorage.getItem("user_id");
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);
let dayarray = [];
let dayAmountArray = [];

for(let i = 0; i < historyData.data.length;i++){
  if(!dayarray.includes(historyData.data[i]["Date"])){
    let sum = 0;
    let tempDate = historyData.data[i]["Date"];
    for(let j=i;j<historyData.data.length;j++){
      if(historyData.data[j]["Date"]==tempDate){
        sum+=historyData.data[j]["Amount"];
      }
    }
    dayarray.push(historyData.data[i]["Date"]);
    dayAmountArray.push(sum);
  }
}
console.log(dayarray);
console.log(dayAmountArray);
console.log(historyData);

const labels = dayarray;
const data = {
  labels: labels,
  datasets: [{
    label: 'Amount spent on date',
    data: dayAmountArray,
    backgroundColor: '#720e9e',
    borderWidth: 1
  }]
};

let barGraphdiv = document.getElementById("barGraph").getContext("2d");

var barGraph = new Chart(barGraphdiv, {
  type: 'bar',
  data: data,
  options: {
     responsive: false,
     scales:{
      x:{
        grid:{
          color:'white'
        },
        
      },

      y:{
        grid:{
          color:'white'
        }
      }
     }
  },
});

// reteriving category wise data 

let categoryArray = [];
let categoryValueArray = [];
let categoryCountArray = [];
for(let i=0;i<historyData.data.length;i++){
  let tempCat = historyData.data[i]['category'];
  if(!categoryArray.includes(tempCat)){
    categoryArray.push(tempCat);
    let sum = 0;
    let count = 0;
    for(let j=i;j<historyData.data.length;j++){
      if(historyData.data[j]['category']==tempCat){
        sum+=historyData.data[j]['Amount'];
        count++;
      }
    }
    categoryValueArray.push(sum);
    categoryCountArray.push(count); 
  }
 
}


// ploting the horizontal bargraph!



const labels2 = categoryArray;
const data2 = {
  labels: labels2,
  datasets: [{
    label: 'Category Occurance',
    backgroundColor :['red','blue','green'],
    data: categoryCountArray,
    borderWidth: 1
  }]
};

let barHorDiv = document.getElementById("barHor").getContext("2d");

var barHor = new Chart(barHorDiv,{
  type: 'bar',
  data : data2,
  options : {
    responsive: false,
    indexAxis : 'y',
    scales:{ y :{beginAtZero: false},
    // x:{
    //   grid:{
    //     color:'white'
    //   }
    // },
    // y:{
    //   grid:{
    //     color:''
    //   }
    // }
  }
}
})

console.log(categoryArray);
console.log(categoryValueArray);

const data3 = {
  labels: categoryArray,
  datasets: [{
    label: 'Amount',
    data: categoryValueArray,
    hoverOffset: 4,
    options:{
      responsive:false
    }
  }]
};

let categoryGraphDiv = document.getElementById("categoryGraph").getContext("2d");

const categoryGraph = new Chart(categoryGraphDiv,{
  type: 'doughnut',
  data: data3
})

// trying to update history column
for(let i=0;i<historyData.data.length;i++){
  let tempSrDiv = document.createElement('div');
  let tempTitleDiv = document.createElement('div');
  let tempAmountDiv = document.createElement('div');
  let tempCategoryDiv = document.createElement('div');
  let tempDateDiv = document.createElement('div');
  tempSrDiv.innerHTML = i+1; 
  tempTitleDiv.innerHTML = `<div class="historycolElement">${historyData.data[i]['Title']}</div>`
  tempAmountDiv.innerHTML = `<div class="historycolElement">${'Rs '+historyData.data[i]['Amount']}</div>`
  tempCategoryDiv.innerHTML = `<div class="historycolElement">${historyData.data[i]['category']}</div>`
  tempDateDiv.innerHTML = `<div class="historycolElement">${historyData.data[i]['Date']}</div>`
  document.querySelector('#serialNumber').appendChild(tempSrDiv);
  document.querySelector('#transTitle').appendChild(tempTitleDiv);
  document.querySelector('#transCategory').appendChild(tempCategoryDiv);
  document.querySelector('#transAmount').appendChild(tempAmountDiv);
  document.querySelector('#transDate').appendChild(tempDateDiv);
}
