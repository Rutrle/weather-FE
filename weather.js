const api_key = "YD3D567R2QPAU9Q8E5ATJAYXT";
const api_location= "Prague";

let api_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${api_location}?key=${api_key}&unitGroup=metric`;

async function getWeather(api_key, api_location){
    const response = await fetch(api_url,{mode: 'cors'})
    const weather_data = await response.json()
    //console.log(weather_data)
    //console.log(JSON.stringify(weather_data, null,2 ))

    return weather_data
}

let k = getWeather(api_key, api_location)
k.then(result =>{
    retrieveWeather(result)
}
)


function retrieveWeather(rawData){
    let cleanData ={
        currentTemperature: rawData["currentConditions"]["temp"],
        currentPressure: rawData["currentConditions"]["pressure"],
        days: []
    }
    rawData["days"].forEach(element=>{
        dayData ={
            date: element.datetime,
            description: element.description,
            temperatureMax: element.tempmax,
            temperatureMin: element.tempmin,
            pressure: element.pressure
        }
        cleanData.days.push(dayData)
        console.log(dayData)

    })
    console.log(rawData)
    console.log(cleanData)



}