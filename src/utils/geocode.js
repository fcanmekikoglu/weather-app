const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmNhbm1la2lrb2dsdSIsImEiOiJjbDV2Ym5zcmswODliM2VucWl6cjV4bmcyIn0.Sqxl_-uHrvw-RM8musR4Kg&limit=1'


    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to Geolocation services!', undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode