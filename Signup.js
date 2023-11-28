import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key); 
const getUserDetails =  await database.from('users').select('walletname');
console.log(getUserDetails.data[0]);

let walletName ;
let pass;
let confirmPass;
let submitBtn = document.querySelector(".submitButton");

submitBtn.addEventListener("click",checkSignup);

async function checkSignup(){
walletName = document.querySelector("#walletNameIn").value;
pass = document.querySelector("#passwordIn").value;
confirmPass = document.querySelector("#passwordCheck").value;
let budgetImport = document.querySelector("#budgetImport").value;
for(let i=0;i<getUserDetails.data.length;i++){
    if(walletName.localeCompare(getUserDetails.data[i]["walletname"])==0){
        alert("wallet name already exists choose a different one please!")
        return;
    }
};
    
        if(pass.localeCompare(confirmPass)!=0){
            alert("Please enter the same password in both column!")
            pass.value=""
            confirmPass.value=""
            return;
        }

    try{
        const userExport = await database.from("users").insert([{"walletname":walletName,"password":pass,"Budget":budgetImport,"userBalance":budgetImport}]);
        alert("Welcome !")
        window.location.href="index.html";
    } catch (error){
        alert("Please Retry!",error);
    }

}