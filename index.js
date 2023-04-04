
// Form
let inputButton = document.querySelector("#inputButton");
let inputValue = document.querySelector("input");

//Information box
let locationName = document.querySelector('.locationName');
let temperature = document.querySelector(".temperature");
let weather = document.querySelector(".weather");


inputButton.addEventListener("click", () => {
    weatherApiCall(inputValue.value);
});

// function getLocation(val){

//     let locationHttp = `http://api.openweathermap.org/data/2.5/weather?q=${val}&APPID=6fbd3255777a4f59edf86970a79b99ec`;

// }

async function weatherApiCall(loc) {


    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=6fbd3255777a4f59edf86970a79b99ec`, { mode: 'cors' });
        const weatherData = await response.json();
        if(response.status == 404){
            alert(weatherData.message);
            inputValue.value='';
        }
        locationName.textContent = changeLocation(loc) + "," + weatherData.sys.country;
        temperature.textContent = convertKelvinToCelsius(weatherData.main.temp);
        weather.textContent = weatherData.weather[0].main;
        console.log(weatherData.weather[0].main);
    }
    catch (e) {
        console.log(e);
    }
}


function changeLocation(loc) {
    let firstLetter = loc.slice(0, 1).toUpperCase() + loc.slice(1);
    return firstLetter;
}

function convertKelvinToCelsius(temp) {
    let KelvinToCelcius = Math.round(temp - 275.15);
    return KelvinToCelcius + "\u00B0 C";
}