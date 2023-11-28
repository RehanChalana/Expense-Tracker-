import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
let user_id = sessionStorage.getItem("user_id");
let historyData = await database.from("ExpenseHistory").select("Amount,Date,category,Title").eq("user_id",user_id);
console.log(historyData.data)
const downlaod_btn =document.querySelector("#downloadBtn");
downlaod_btn.addEventListener("click",download);
function download(){  
// Sample data (replace this with your actual expense data)
fetch('http://localhost:5000/generate_pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(historyData.data), // Send your data as JSON
})
.then(response => response.blob())
.then(blob => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense_report.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
;}