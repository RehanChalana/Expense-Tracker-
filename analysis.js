
import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const username = sessionStorage.getItem("user");

const budgetImport = await database.from("users").select("Budget").eq("walletname",username);
const balanceImport = await database.from("users").select("userBalance").eq("walletname",username);
var Balance = balanceImport.data[0]["userBalance"]; 
const BUDGET = budgetImport.data[0]["Budget"];



//making the daily weekly yearly clickable 
const daily = document.querySelector("#daily");
const monthly = document.querySelector("#monthly");
let isDaily = true;
let isMonthly = false;

daily.addEventListener("click",selectDaily);
monthly.addEventListener("click",selectMonthly);


let dailyAfter = document.styleSheets[0].cssRules[17];
let weeklyAfter = document.styleSheets[0].cssRules[20];
let monthlyAfter = document.styleSheets[0].cssRules[22];
selectDaily();
function selectDaily(){
  dailyAfter.style.width="95%";
  weeklyAfter.style.width="0%";
  monthlyAfter.style.width="0%";
  daily.style.opacity="1";
  daily.style.fontSize="50px"; 
  monthly.style.opacity="0.6";
  monthly.style.fontSize="40px";
}

function selectMonthly(){
  monthlyAfter.style.width="95%";
  dailyAfter.style.width="0%";
  weeklyAfter.style.width="0%";
  monthly.style.opacity="1";
  monthly.style.fontSize="50px";
  daily.style.opacity="0.6"
  daily.style.fontSize="40px";
  isDaily = false;
  isMonthly = true;
}
// updating the progress graph

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


let user_id = sessionStorage.getItem("user_id");
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);

// ploting the main graph! day wise

console.log("historyData")
console.log(historyData);
let dayarray = [];
let dayAmountArray = [];
// let monthdata = {"01":0,"02":0,"03":0,"04":0,"05":0,"06":0,"07":0,"08":0,"09":0,"10":0,"11":0,"12":0};
let monthlyValues = [0,0,0,0,0,0,0,0,0,0,0,0];
for(let i = 0; i < historyData.data.length;i++){
  if(!dayarray.includes(historyData.data[i]["Date"])){
    let sum = 0;
    let tempDate = historyData.data[i]["Date"];
    for(let j=i;j<historyData.data.length;j++){
      if(historyData.data[j]["Date"]==tempDate){
        sum+=historyData.data[j]["Amount"];
      }
    }
    if(historyData.data[i]["Date"].slice(5,7))
    monthlyValues[parseInt(historyData.data[i]["Date"].slice(5,7),10)-1]+=historyData.data[i]["Amount"];
    dayarray.push(historyData.data[i]["Date"]);
    dayAmountArray.push(sum);
  }
}
console.log("month data");
console.log(monthlyValues);
console.log(historyData);

let labels = dayarray.slice(-7);
const data = {
  labels: labels,
  datasets: [{
    label: 'Amount spent',
    data: dayAmountArray.slice(-7),
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
        ticks:{
          color:'white'
        }
        
      },

      y:{
        grid:{
          color:'white'
        },
        ticks:{
          color:'white'
        }
      }
     },
     plugins:{
      legend:{
        labels:{
          color:'white',
          font:{
            size:22
          }
        }
      }
     }
  }
});

window.updateDailyGraph = function () {
  var newLabels = dayarray.slice(-7);
  var newData = dayAmountArray.slice(-7);

  barGraph.data.datasets[0].data = newData;
  barGraph.data.labels = newLabels;

  barGraph.update();
}
daily.addEventListener("click",updateDailyGraph);

window.updatemonthlygraph = function () {
  // Generate new data (replace this with your logic to get new data)
  var newData = monthlyValues;
  var newLabels = ["jan","feb","March","April","May","June","July","August","September","October","November","December"]
  
  // Update the chart data
  barGraph.data.datasets[0].data = newData;
  barGraph.data.labels = newLabels;

  // Update the chart
  barGraph.update();
};

monthly.addEventListener("click",updatemonthlygraph);







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



// sorting the category wise data :!

for(let i = 0; i<categoryCountArray.length;i++){
  for(let j=i;j>0;j--){
    if(categoryCountArray[j]<categoryCountArray[j-1]){
      let temp = categoryCountArray[j-1];
      categoryCountArray[j-1]=categoryCountArray[j];
      categoryCountArray[j] = temp;

      let temp2 = categoryArray[j-1];
      categoryArray[j-1]= categoryArray[j];
      categoryArray[j]=temp2;

      let temp3 = categoryValueArray[j-1];
      categoryValueArray[j-1]=categoryValueArray[j];
      categoryValueArray[j]=temp3;
    }
  }
}




// ploting the horizontal bargraph!
const labels2 = categoryArray.slice(-3);
const data2 = {
  labels: labels2,
  datasets: [{
    label: 'Category Occurance',
    backgroundColor :['red','blue','green'],
    data: categoryCountArray.slice(-3),
    borderWidth: 1
  }]
};

let barHorDiv = document.getElementById("barHor").getContext("2d");
var barHor = new Chart(barHorDiv,{
  type: 'bar',
  data : data2,
  options : {
    plugins:{
      legend:{
        display:false,
      }
    },
    responsive: false,
    indexAxis : 'y',
    scales:{ y :{beginAtZero: false,ticks:{color:'white'}},x:{ticks:{color:'white'}}
  }
}
})

console.log(categoryArray);
console.log(categoryValueArray);

const data3 = {
  labels: categoryArray,
  datasets: [{
    label: 'Amount',
    backgroundColor :['#1f78b4','#33a02c','#ff7f00','#fdbf6f','#6a3d9a','#b15928' ],
    data: categoryValueArray,
    hoverOffset: 4,
    options:{
      responsive:false,
    }
  }]
};

let categoryGraphDiv = document.getElementById("categoryGraph").getContext("2d");

const categoryGraph = new Chart(categoryGraphDiv,{
  type: 'doughnut',
  data: data3,
  options:{
    plugins:{
      legend:{
        display:true,
        position:'top',
        // font:{
        //   Color:'white'
        // }
      }
    },
  }
})


// updating limits !
const limits = await database.from("users").select("dailyLimit,monthlyLimit").eq("walletname",username);
let dailySpent = 0;
let monthlySpent = 0;
let tempDate = historyData.data[historyData.data.length-1]["Date"];
let tempMonth = tempDate.slice(5,7);
console.log(tempDate,tempMonth);
for(let i=0;i<historyData.data.length;i++){
  if(tempDate==historyData.data[i]["Date"]){
    dailySpent+=historyData.data[i]["Amount"];
  }
  if(historyData.data[i]["Date"].slice(5,7)==tempMonth){
    monthlySpent+=historyData.data[i]["Amount"];
  }
}
console.log(monthlySpent);

let dailyLimit =  Math.round((dailySpent/limits.data[0]["dailyLimit"])*100);
let monthlyLimit = Math.round((monthlySpent/limits.data[0]["monthlyLimit"])*100);
if(dailyLimit>100){
  dailyLimit=100;
}
if(monthlyLimit>100){
  monthlyLimit=100
}


document.querySelector(".dailyLimit").style.setProperty('--p',dailyLimit);
document.querySelector(".monthlyLimit").style.setProperty('--p',monthlyLimit);

// updating row 3
let mostSpentCat = categoryArray[categoryValueArray.indexOf(Math.max(...categoryValueArray))];
let leastSpentCat = categoryArray[categoryValueArray.indexOf(Math.min(...categoryValueArray))];
let mostSpentMonth = 
document.querySelector(".mostSpentCatText").innerText=mostSpentCat;
document.querySelector(".leastSpentCatText").innerText=leastSpentCat;
