const API_URL =
"https://script.google.com/macros/s/AKfycbyNeFEI36Z3DvERgAP4BZnGFPfG3J7lKEfE4WcwpVbOl4Kb4lMnbpC-LSN5YTejragJ/exec";

function login(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const url =
`${API_URL}?action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

fetch(url)
.then(response => response.json())
.then(data => {

console.log("API Response:", data);

if(data.status === "success"){

localStorage.setItem("volunteer", data.name);
window.location.href = "day.html";

}
else{

alert("Invalid credentials");

}

})
.catch(err => console.error("Fetch Error:", err));

}
