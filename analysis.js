var xValues = ["19jan", "20jan", "21jan", "Yesterday", "Today"];
var yValues = [1500,1700,2000,1800,1700];
var barColors = ["red", "green","blue","orange","brown"];

Chart.defaults.backgroundColor = '#720e9e';
Chart.defaults.color = '#720e9e';
new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
    data: yValues,
    backgroundColor:'#720e9e',
    color:'#FFFFFF',
    }]},
  options: { 
  scales:{
    x:{
      grid:{
        color:'white'
      }
    }
  },  
  legend: {display: false},
  title: {
        display: true,
        text: "Day Wise Spends"},
       
}});