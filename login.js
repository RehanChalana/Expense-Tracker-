import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const getUserDetails =  await database.from('users').select('walletname');
// console.log(getUserDetails.data[]["walletname"]);
let wallet_name;
let password_in;
let isUser = false;
let balance_in;
 document.querySelector(".submitButton").addEventListener("click", checkLogin);
// document.querySelector(".submitButton").addEventListener("click", addNewUser);

// async function addNewUser(){
//     try {
//         wallet_name = document.querySelector("#walletNameIn").value;
//         password_in = document.querySelector("#passwordIn").value;
//         balance_in = document.querySelector("#budgetAmount").value;
//         const addUserDetails = await database.from('users').insert([
//           {"walletname": wallet_name,"Budget":balance_in,"password":password_in,"userBalance":balance_in}
//         ]);
//         console.log(wallet_name);
    
//         console.log('User details added successfully:', addUserDetails);
//       } catch (error) {
//         console.error('Error adding user details:', error);
//       }
// }


async function checkLogin(){
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
            window.location.href="DashBoard.html";   
        } else{
            alert("wrong password");
        }
    } else{
        alert("User not found please signup first")
    }
    redirect();
}







   



   


