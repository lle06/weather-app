function updateWeather(response) {
    let currenTempElement = document.querySelector("#currentTemp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;
    currenTempElement.innerHTML = Math.round(temperature);

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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Denver");

//vanilla weather search/ API integration
//vanilla search/ weather data
//time and date
//need to comment out forecast?