const request = require ('request')

const forecast = (lat, lon, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f241dcff627784ecd10e8f9bf8621ecf&query='+ lon + ',' + lat
    console.log(url)
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect weather services', undefined )
        }else if (body.error){
            callback('Unable to find location', undefined)
        }else {
            callback (undefined, {
                temp : body.current.temperature,
                feelstemp : body.current.feelslike,
                description : body.current.weather_descriptions[0],
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast



