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
    'product': 'Bags',
    'userAmount': 42
  }
];
