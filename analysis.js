
import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const username = sessionStorage.getItem("user");

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
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category").eq("user_id",user_id);
let dayarray = [];
let dayAmountArray = [];

for(let i = 0; i < historyData.data.length;i++){
  if(!dayarray.includes(historyData.data[i]["Date"])){
    let sum = 0;
    let tempDate = historyData.data[i]["Date"];
    for(let j=0;j<historyData.data.length;j++){
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
    label: 'My First Dataset',
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


const labels2 = ["Snacks","Clothing","Educational"]
const data2 = {
  labels: labels2,
  datasets: [{
    label: 'Category Analysis',
    data: [4,5,2],
    backgroundColor: ['blue','green','red'],
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


// trying to plot the category chart 
let categoryArray = [];
let categoryValueArray = [];
for(let i=0;i<historyData.data.length;i++){
  let tempCat = historyData.data[i]['category'];
  if(!categoryArray.includes(tempCat)){
    categoryArray.push(tempCat);
    let sum = 0;
    for(let j=i;j<historyData.data.length;j++){
      if(historyData.data[j]['category']==tempCat){
        sum+=historyData.data[j]['Amount'];
      }
    }
    categoryValueArray.push(sum); 
  }
 
}
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