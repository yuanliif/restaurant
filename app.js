// config express
const express = require('express')
const app = express()
const port = 3000
//config express handlebars
const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

//render index page
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

// render show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filterRestaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {restaurants: filterRestaurant, keyword: keyword})
})

app.listen(port, () => {
  console.log(`${port}`)
})