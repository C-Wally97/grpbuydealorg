// npm modules
const express = require('express');
const app = express();
const mysql = require('mysql2');
// our modules
const db = require('./modelSQL.js');
const auth = require('./auth.js');

// server hosting
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/', express.static('public'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
 console.log(`app listening on port ${PORT}!`)
});

async function renderIndex(req, res) {
  res.render('index', {data: {}})
}

db.init();

// api calls
app.get("/", renderIndex)
app.get('/api/productListings', getProductListings);
app.post('/api/productListing', postProductListing);
app.post('/api/login', auth.login);

/**
* returns all of the product listings
*/
async function getProductListings(req, res) {
  res.json(await db.showAll('ProductListings'));
}

/**
* posts a product listing, data in query component
*/
async function postProductListing(req, res){
  const supplier_id = 1;
  try {
    const result = await db.insertProductListing(req.query.name, supplier_id);
    console.log(result);
    res.sendStatus(200);
  } catch(e) {
    console.error(e);
    res.sendStatus(404);
  }
}

// index memory data
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
