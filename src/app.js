const path = require ('path') 
const express = require ('express')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express() //to get app. functioınality

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') //to access root
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars angine and views location
app.set('view engine','hbs') //handlebars
app.set('views', viewsPath) // changing default for hbs
hbs.registerPartials(partialsPath)

//Setup static dir to serve
app.use(express.static(publicDirectoryPath)) // doesnt make sense yet


app.get('', (req, res)=>{
    res.render ('index', {
        title: 'Weather',
        name: 'Zehir Faho'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Zehir Faho'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'If you are having a trouble with this application, contact lorem@ipsum.org',
        name: 'Zehir Faho'
    })
})

//weather query strings
app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provided an location to search'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error:'Unable to find location provided'
                })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send ({
                        error: 'Unable to find location provided'
                    })
                }
                res.send({
                    location: location,
                    forecast: forecastData,           
                    }
        
                )
            })  
        })
    }
})


//search query
app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
//404 on sub directory
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help',
        name: 'Zehir Faho'
    })
})

// for 404 pages, this has to come last (looks top to bottom)
app.get('*', (req, res) => {    
    res.render('404',{
        title: '',
        name: 'Zehir Faho'
    })
})
//Start server
app.listen(3000, ()=>{
    console.log('Server initialized on port 3000.')
})

