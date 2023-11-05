
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





const labels = ["Jan","Feb","june","july","Aug","May","Nov"]
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
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


// const labels3=["Snacks","Educational","Subscriptions","Food","Travel"]
// const data3={
//   labels:labels3,
//   datasets: 
//     {
//       data: [50, 60, 70, 180, 190],
//     }
// }


const data3 = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
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