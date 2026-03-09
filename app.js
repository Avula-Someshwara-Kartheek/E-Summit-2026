const API_URL = "https://script.google.com/macros/s/AKfycbyNeFEI36Z3DvERgAP4BZnGFPfG3J7lKEfE4WcwpVbOl4Kb4lMnbpC-LSN5YTejragJ/exec";

function sendScan(decodedText){

fetch(API_URL, {

method: "POST",

headers: {
"Content-Type": "text/plain;charset=utf-8"
},

body: JSON.stringify({
action: "scan",
qrText: decodedText,
day: localStorage.getItem("day"),
event: localStorage.getItem("event"),
volunteer: localStorage.getItem("volunteer")
})

})
.then(res => res.json())
.then(data => {

console.log("Response:", data);

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

})
.catch(err => console.error(err));

}

}
}
