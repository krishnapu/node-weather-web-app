const request = require('request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia3Jpc2hiaXR3MTAwMCIsImEiOiJja2RjbGV1bjAxMnhvMnByeHAxaTJwM2lyIn0.myg1svqPhYPELMN686HfIA&limit=1`


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to find Location Services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location. Try another search')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}





module.exports = geocode