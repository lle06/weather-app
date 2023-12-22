function updateWeather(response) {
    let currenTempElement = document.querySelector("#currentTemp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#desc");
    let humidityElement = document.querySelector("#humidity");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = response.data.wind.speed;
    let iconElement = document.querySelector("#daily-temp-icon");

    console.log(response.data);

    iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="weather-app-icon"/>`
    timeElement.innerHTML = formatDate(date);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    currenTempElement.innerHTML = Math.round(temperature);
    windSpeedElement.innerHTML =`${Math.round(windSpeed)}mph`;

    getForecast(response.data.city);

}

function formatDate(date) {
    /* let hour = ["12","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]; */
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];

    return `${hours}:${minutes} — ${day}`;
}

function searchCity(city) {
    let apiKey = "41ac53a28fd8b3fdd43983da09t8o268";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiURL).then(updateWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}


function formatDay (timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];

    return days [date.getDay()];
}


function getForecast(city) {
    let apiKey ="41ac53a28fd8b3fdd43983da09t8o268";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

    axios(apiURL).then(displayForecast);
}


function displayForecast(response) {
    console.log(response.data);

    let forecastHTML = "";

    response.data.daily.forEach(function(day, index) {
        if (index < 5) {
             forecastHTML =
                forecastHTML +
                `<div class = "row weekly-forecast" id = "forecast">
                <div class = "column-1">
                    <div class = "day">
                        ${formatDay(day.time)}
                    </div>
                    <div>
                        <img src = "${day.condition.icon_url}"  class = "emoji"/>
                    </div>
                    <div class = "temp">
                        <span class = "hi-temp"><strong>
                            ${Math.round(day.temperature.maximum)}°
                        </strong>
                        </span>
                        <span class = "lo-temp">
                            ${Math.round(day.temperature.minimum)}°
                        </span>
                    </div>
                </div>
            </div>`;
        }
    });
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);



searchCity("Denver");

