const express = require('express');
const app = express();
const db = require('./modelSQL.js');
const mysql = require ('mysql2')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/', express.static('public'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`app listening on port ${PORT}!`)
});

app.get("/", renderIndex)
app.get('/api/productListings', getProductListings);

async function getProductListings(req, res) {
    res.json(productListings);
}

async function renderIndex(req, res) {
  res.render('index', {data: {}})
}

let productListings = [
  {
    'id': 1,
    'product': 'Gamer shades',
    'date': '01/02/2020',
    'supplier': 'GamerSwag.com',
    'userAmount': 42,
    'rating': 420
  }
];
