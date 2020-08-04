const request = require('request')

const weather = (lat, lon, callback) => {

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bcb6eeafc2b77cd0299093369ed918da`

    //Petra
    // http://api.openweathermap.org/data/2.5/weather?lat=30.32686555&lon=35.4443585&appid=bcb6eeafc2b77cd0299093369ed918da

    request({ url, json: true }, (error, { body }) => {
        if (error) {

            callback('Unable to find the location', undefined)

        } else if (body.message) {

            callback('No city found.', undefined)

        } else {

            callback(undefined,
                `Weather: ${body.weather[0].main} | | Temperature: ${(body.main.temp - 273.15).toFixed(2)} °C  | | Wind_speed: ${body.wind.speed}m/s | |  Humidity: ${body.main.humidity}%`
                // ${body.weather[0].main}. The temperature is ${(body.main.temp - 273.15).toFixed(2)} °C  and the wind speed is ${body.wind.speed}m/s. Humidity is ${body.main.humidity}%`
            )

        }
    })
}










module.exports = weather