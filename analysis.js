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


const labels3=["Snacks","Educational","Subscriptions","Food","Travel"]
const data3={
  labels:labels3,
  datasets: 
    {
      data: [50, 60, 70, 180, 190],
    }
}

let categoryGraphDiv = document.getElementById("categoryGraph").getContext("2d");