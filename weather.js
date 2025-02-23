const api_key = "YD3D567R2QPAU9Q8E5ATJAYXT";


async function getWeather(api_key, api_location) {
    console.log(api_location)
    let api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${api_location}?key=${api_key}&unitGroup=metric`;

    const response = await fetch(api_url, { mode: 'cors' })
    const weather_data = await response.json()
    //console.log(weather_data)
    //console.log(JSON.stringify(weather_data, null,2 ))

    return retrieveWeather(weather_data)
}

function retrieveWeather(rawData) {
    let cleanData = {
        currentTemperature: rawData["currentConditions"]["temp"],
        currentPressure: rawData["currentConditions"]["pressure"],
        days: []
    }
    rawData["days"].forEach(element => {
        let dayData = {
            date: element.datetime,
            description: element.description,
            temperatureMax: element.tempmax,
            temperatureMin: element.tempmin,
            pressure: element.pressure
        }
        cleanData.days.push(dayData)
    })
    return cleanData
}

function showCurrentWeather(weatherData){
    const currentDataDiv = document.querySelector("#current-forecast");
    currentDataDiv.innerHTML="";

    const temperatureHeader = document.createElement("h2");
    temperatureHeader.textContent = "Current weather";

    const temperatureDisplay = document.createElement("h3");
    temperatureDisplay.textContent = weatherData.currentTemperature + " °C";

    const pressureDisplay = document.createElement("h4");
    pressureDisplay.textContent = weatherData.currentPressure + " mbar";

    currentDataDiv.appendChild(temperatureHeader);
    currentDataDiv.appendChild(temperatureDisplay);
    currentDataDiv.appendChild(pressureDisplay);

}

function showForecastByDay(weatherData){
    const forecastDiv = document.querySelector("#day-forecast");
    forecastDiv.innerHTML = "";
    console.log(weatherData)

    weatherData.days.forEach(element=>{
        const cardDiv = document.createElement("div");

        const dateDisplay = document.createElement("h3");
        dateDisplay.textContent = element.date

        const dayDescription = document.createElement("h4");
        dayDescription.textContent = element.description ;
        dayDescription.classList.add("card-content")

        const temperatureMax = document.createElement("h4");
        temperatureMax.textContent = "Max   "+ element.temperatureMax + " °C";
        temperatureMax.classList.add("card-content")

        const temperatureMin = document.createElement("h4");
        temperatureMin.textContent ="Min   "+ element.temperatureMin + " °C";
        temperatureMin.classList.add("card-content")

        const dayPressure= document.createElement("h4");
        dayPressure.textContent ="pressure   " + element.pressure + " mbar";
        dayPressure.classList.add("card-content")


        cardDiv.classList.add("forecast-card")
        cardDiv.appendChild(dateDisplay)
        cardDiv.appendChild(dayDescription)
        cardDiv.appendChild(temperatureMax)
        cardDiv.appendChild(temperatureMin)
        cardDiv.appendChild(dayPressure)

        forecastDiv.appendChild(cardDiv)

        
    })

}

const locationForm = document.querySelector("#locationForm")
locationForm.addEventListener("submit",event =>{
    event.preventDefault()
    userLocation = document.querySelector("#location").value

    let k = getWeather(api_key, userLocation)
    k.then(result => {
    showCurrentWeather(result)
    showForecastByDay(result)
    })
})