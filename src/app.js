const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Express paths configuration
const publicDirectoryPath = path.join('__dirname', '../public')
const viewsPath = path.join('__dirname', '../templates/views')
const partialPath = path.join('__dirname', '../templates/partials')

// Set express view engine and views and partial location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Static or public path
app.use(express.static(publicDirectoryPath))


//Home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        message: 'Enter a location to find the weather',
        name: 'Hasta la vista Baby'
    })
})

//About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        message: 'We are going to ROCK',
        name: 'Hasta la vista Baby'
    })
})

//Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We are here to help you',
        name: 'Hasta la vista Baby'
    })
})


//Weather
app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send({
            error: 'Please provide an address'
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        weather(latitude, longitude, (error, weather) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                description: weather,
                location,
                address: req.query.address
            })
        })


    })

})



//Help page 404 Error
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        info: 'Help article not found',
        name: 'Hasta la vista Baby'
    })
})

//404 Page
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        info: 'Page not found',
        name: 'Hasta la vista Baby'
    })
})




app.listen(4000, () => console.log('Server is started'))