// core node modules does not need to be installed, they are built in
const path = require('path');
// all others need to be installed
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve (folder exposed to web server)
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Monchee',
    forecast: 'It\'s cold outside',
    location: 'London'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Monchee'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Monchee',
    message: 'Monchee can do it '
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address must be provided!'
    })
  }

  geocode(req.query.address, (error, { name, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(name, (error, data) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: data,
        location,
        address: req.query.address
      })
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Monchee',
    message: 'Help article not found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Monchee',
    message: 'Page not found'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
