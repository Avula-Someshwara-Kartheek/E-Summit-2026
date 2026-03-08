function login(){

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
