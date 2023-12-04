import {supabase_url,supabase_key} from './keys.js';
const database = supabase.createClient(supabase_url,supabase_key);  
const username = sessionStorage.getItem("user");


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




