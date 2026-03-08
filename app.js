const API_URL =
"https://script.google.com/macros/s/AKfycbyNeFEI36Z3DvERgAP4BZnGFPfG3J7lKEfE4WcwpVbOl4Kb4lMnbpC-LSN5YTejragJ/exec";

document.addEventListener("DOMContentLoaded", function(){

if(document.getElementById("reader")){

let lastScan = null;

const scanner = new Html5Qrcode("reader");

scanner.start(
{ facingMode: "environment" },
{ fps:10, qrbox:250 },

function(decodedText){

if(decodedText === lastScan){
return;
}

lastScan = decodedText;

document.getElementById("result").innerText =
"Verifying Ticket...";

/* SEND QR TO APPS SCRIPT */

fetch("https://script.google.com/macros/s/AKfycbw1rsZj15qsa53SzQpN0XPPIe3LZ2d30vLhfLhZ5zb3YAUBjAq4qwnh08f5afTaRUCg/exec", {

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

qrText:decodedText,
day:"Day-1",
event:"Registration Desk",
volunteer:"Scanner Device"

})

})

.then(res => res.json())
.then(data => {

if(data.status === "success"){

document.getElementById("result").innerText =
"ENTRY CONFIRMED: " + data.name;

}

else if(data.status === "duplicate"){

document.getElementById("result").innerText =
"ALREADY SCANNED";

}

else{

document.getElementById("result").innerText =
"INVALID TICKET";

}

setTimeout(()=>{
lastScan = null;
},2000);

})

.catch(err => {

document.getElementById("result").innerText =
"SERVER ERROR";

});

}

);

}

});
