const API_URL =
"https://script.google.com/macros/s/AKfycbyNeFEI36Z3DvERgAP4BZnGFPfG3J7lKEfE4WcwpVbOl4Kb4lMnbpC-LSN5YTejragJ/exec";

document.addEventListener("DOMContentLoaded", function(){

if(document.getElementById("reader")){

const scanner = new Html5Qrcode("reader");

scanner.start(
{ facingMode: "environment" },
{ fps:10, qrbox:250 },

onScanSuccess

);

}

});


function onScanSuccess(decodedText){

document.getElementById("result").innerText =
"Verifying Ticket...";

fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

action:"scan",
qrText:decodedText,
day:localStorage.getItem("day"),
event:localStorage.getItem("event"),
volunteer:localStorage.getItem("volunteer")

})

})

.then(res=>res.json())
.then(data=>{

if(data.status==="success"){

document.getElementById("result").innerText =
"ENTRY CONFIRMED: " + data.name;

}

else if(data.status==="duplicate"){

document.getElementById("result").innerText =
"ALREADY SCANNED";

}

else{

document.getElementById("result").innerText =
"INVALID TICKET";

}

})
.catch(err => {

document.getElementById("result").innerText =
"SERVER ERROR";

});

}
