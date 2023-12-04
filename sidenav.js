import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const username = sessionStorage.getItem("user");
let user_id = sessionStorage.getItem("user_id");
let userData = await database.from("users").select("Budget,userBalance,password").eq("user_id",user_id);

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

// making change password working!

let changePasswordBtn = document.querySelector('#changePasswordBtn');
changePasswordBtn.addEventListener("click",changePassword);

async function changePassword(){
    let password = document.querySelector("#curPassword").value;
    let newPassword = document.querySelector("#newPassword").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;

    if(password.localeCompare(userData.data[0]["password"])!=0){
        alert("please enter the correct current password")
        return;
    } else{
        if(newPassword.localeCompare(confirmPassword)!=0){
            alert("new password and confirm password does not match!")
            return;
        } else{
            let passwordExport = await database.from("users").update([{"password":newPassword}]).eq("user_id",user_id);
            alert("password changed successfuly");
            window.location.href="index.html";
        }
    }

}

document.querySelector("#submitLimitData").addEventListener("click",changeLimits);

async function changeLimits(){
    let dailyIn = document.querySelector("#dailyIn").value;
    let monthlyIn = document.querySelector("#monthlyIn").value;
    try{
        let limitExport = await database.from("users").update([{"dailyLimit":dailyIn,"monthlyLimit":monthlyIn}]).eq("user_id",user_id);
        alert("Limits updated succesfully!")
    } catch{
        alert("Error 404 signal not found")
    }

}






