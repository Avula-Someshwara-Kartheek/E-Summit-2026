
function login(){
const API_URL = "https://script.google.com/macros/s/AKfycbxfSTHxRUlF6v8-yzTMjF_aQn2698RQsfZX-jKQOZ21ryTKLzsbDwZzhuGXS0LMDEa3/exec";
const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
action:"login",
email:email,
password:password
})

})

.then(res=>res.json())
.then(data=>{

if(data.status==="success"){

localStorage.setItem("volunteer",data.name);

window.location="select-day.html";

}

else{

alert("Invalid Credentials");

}

});

}
