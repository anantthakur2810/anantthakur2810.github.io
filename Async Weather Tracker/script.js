const apiKey = "26bea901a0d876a7c67e498a918f14fc";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const historyList = document.getElementById("history");
const logBox = document.getElementById("log");

function log(msg){
console.log(msg);
logBox.textContent += msg + "\n";
}

searchBtn.addEventListener("click", () => {
const city = cityInput.value.trim();

if(city === ""){
alert("Enter a city name");
return;
}

getWeather(city);
});

async function getWeather(city){

log("1️⃣ Function started");

try{

log("2️⃣ Fetching weather...");

const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

log("3️⃣ Response received");

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

displayWeather(data);

saveHistory(city);

}
catch(error){

weatherResult.innerHTML = "❌ Error: " + error.message;

log("⚠️ Error caught");

}

log("4️⃣ Function finished");

}

function displayWeather(data){

weatherResult.innerHTML = `
<p><b>City:</b> ${data.name}</p>
<p><b>Temperature:</b> ${data.main.temp} °C</p>
<p><b>Weather:</b> ${data.weather[0].description}</p>
`;

}

function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities",JSON.stringify(history));
}

loadHistory();
}

function loadHistory(){

historyList.innerHTML = "";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(city =>{

const li = document.createElement("li");

li.textContent = city;

li.onclick = () => getWeather(city);

historyList.appendChild(li);

});

}

loadHistory();
