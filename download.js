import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
let user_id = sessionStorage.getItem("user_id");
let userData = await database.from("users").select("walletname,Budget,userBalance").eq("user_id",user_id);
console.log(userData)
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);
console.log(historyData.data)


let dataExportPY = {"request":"pdf","historyData":historyData.data,"userData":userData.data};

// pdf download
const downlaod_btn = document.querySelector("#downloadBtn");
downlaod_btn.addEventListener("click",pdfDownload);

function pdfDownload(){
    dataExportPY["request"]="pdf";
    download();
}

// xl download 
const excelBtn = document.querySelector("#exportToExcel");
excelBtn.addEventListener("click",excelDownload);

function excelDownload(){
    dataExportPY["request"]="xl"
    download();
}

// csv download 

const csvBtn = document.querySelector("#exportToCSV");

csvBtn.addEventListener("click",csvDownload);

function csvDownload(){
    dataExportPY["request"]="csv";
    download();
}

function download(){  
// Sample data (replace this with your actual expense data)

fetch('http://localhost:5000/generate_pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataExportPY), // Send your data as JSON
})
.then(response => response.blob())
.then(blob => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    if(dataExportPY["request"]=="pdf"){
        a.download = 'expense_report.pdf';
    } else if(dataExportPY["request"]=="xl"){
        a.download = 'expense_report.xlsx'
    } else if(dataExportPY["request"]=="csv"){
        a.download = 'expense_report.csv'
    }
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
;}