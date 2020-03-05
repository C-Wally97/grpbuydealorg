const express = require('express');
const app = express();
//const db = require('./ModelSQL.js');

app.get('/api/productListings', getProductListings);
app.get('/api/productListing', getProductListing);

async function getProductListings(req, res) {
    if(req.query) {
      console.log("query info:" + req.query);
    } else {
      console.log("no query");
    };
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
