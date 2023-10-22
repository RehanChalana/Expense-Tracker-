const catChart = document.getElementById('catChart');

var data1={
    labels: ["Clothing","Snacks","Food","Education","Subscriptions","Bills"],
    datasets: [
        {
            label: "Expense Categories",
            data: [10,20,30,50,60,10],
            backgroundColor:[
                "#FAEBD7",
                "#DCDCDC",
                "#E9967A",
                "#F5DEB3",
                "#9ACD32"
            ],
            borderColor: [
                "#E9DAC6",
                "#CBCBCB",
                "#D88569",
                "#E4CDA2",
                "#89BC21"
              ],
        }
    ]
};


var options = {
    responsive: true,
    title: {
      display: true,
      position: "top",
      text: "Doughnut Chart",
      fontSize: 18,
      fontColor: "#111"
    },
    legend: {
      display: true,
      position: "bottom",
      labels: {
        fontColor: "#333",
        fontSize: 16
      }
    }
};

new Chart(catChart,{
    type : "doughnut",
    data : data1,
    options:options,   
});