const express = require('express');
const app = express();
//const db = require('./ModelSQL.js');

app.get('/api/productListings', getProductListings);

async function getProductListings(req, res) {
    res.json(productListings);
}

app.listen(8080);

app.use('/', express.static('client', {'extensions': ['html']}));

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
