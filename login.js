import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key); 

let isOnLogin = true;

// Making signup working!
document.querySelector("#Signup").addEventListener("click",changeSignup);

function changeSignup(){
isOnLogin = false;
console.log(isOnLogin);
document.querySelector("#Title").innerText="Sign Up"
let confirmPassword = document.createElement("input");
confirmPassword.setAttribute("type","password");
confirmPassword.setAttribute("placeholder","Confirm Password")
confirmPassword.setAttribute("class","confirmPassword");
let confirmPasswordDiv = document.createElement("div");
confirmPasswordDiv.setAttribute("class","inputWithIcon");
confirmPasswordDiv.innerHTML=`<i class="fa fa-lock fa-lg icon"></i>`;
confirmPasswordDiv.appendChild(confirmPassword);
document.querySelector("#fPass").remove();
document.querySelector(".bottomText").innerText = "Already a User?";
document.querySelector("#Signup").innerText="Login";
document.querySelector(".inputBox").insertBefore(confirmPasswordDiv,document.querySelector("#submitLink"));
}


// sending signup data
document.querySelector(".submitButton").addEventListener("click",exportSignup);

function exportSignup(){
    if(isOnLogin=true){
        return;
    }
    let pass = document.querySelector("#passwordIn").value();
    if(pass==document.querySelector(".confirmPassword").value()){
        alert("User added")
    } else{
        alert("Please Confirm your password correctly!")
    }
}

// Checking login


const getUserDetails =  await database.from('users').select('walletname');
// console.log(getUserDetails.data[]["walletname"]);
let wallet_name;
let password_in;
let isUser = false;
let balance_in;
document.querySelector(".submitButton").addEventListener("click", checkLogin);
async function checkLogin(){
    if(isOnLogin==false){
        return;
    }
    wallet_name = document.querySelector("#walletNameIn").value;
    password_in = document.querySelector("#passwordIn").value;
    for(let i=0; i<getUserDetails.data.length;i++){
        if(wallet_name.localeCompare(getUserDetails.data[i]["walletname"])==0){
            isUser = true;   
            break;
    }}
    if(isUser){
        const getPassDetails = await database.from('users').select('password').eq("walletname",wallet_name);
        if(password_in.localeCompare(getPassDetails.data[0]["password"])==0){
            alert("LOGIN SUCCESS");
            sessionStorage.setItem("user",wallet_name);
            let user_idImport = await database.from('users').select("user_id").eq("walletname",wallet_name);
            let user_id = user_idImport.data[0]['user_id'];
            sessionStorage.setItem("user_id",user_id);
            console.log(user_id);
             window.location.href="DashBoard.html";   
        } else{
            alert("wrong password");
        }
    } else{
        alert("User not found please signup first")
    }
    redirect();
}    









   



   


