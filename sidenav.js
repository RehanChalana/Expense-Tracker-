import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const username = sessionStorage.getItem("user");
let user_id = sessionStorage.getItem("user_id");
let userData = await database.from("users").select("Budget,userBalance").eq("user_id",user_id);

document.querySelector("#endSideBar").addEventListener("click",opennav);
document.querySelector(".closenav").addEventListener("click",closenav);
function opennav(){
    document.querySelector(".sidenav").style.width="450px";
    // document.querySelector("body").style.opacity="0.7";
}
function closenav(){
    document.querySelector(".sidenav").style.width="0px";
}
document.querySelector("#navUserName").innerText=username+"'s wallet";


let BUDGET = userData.data[0]["Budget"];
let Balance = userData.data[0]["userBalance"];
let expense = BUDGET-Balance;


// changing budget's etc using buttons 
let changeBudgetBtn = document.querySelector("#changeBudgetBtn") ;
changeBudgetBtn.addEventListener("click",changeBudget);

async function changeBudget(){
    if(document.querySelector("#changeBudgetIn").value<expense){
        alert("please choose a budget larger than your current expense")
    } else{
        try{
        let newBalance = document.querySelector("#changeBudgetIn").value-expense;
        let exportData = await database.from("users").update([{"Budget":document.querySelector("#changeBudgetIn").value,"userBalance":newBalance}]).eq("user_id",user_id);
        alert("Budget changed succesfully ")
        location.reload();
        } catch{
            alert("could not change budget please try again")
        }   
    }
}





