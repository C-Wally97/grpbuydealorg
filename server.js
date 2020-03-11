// npm modules
const express = require('express');
const app = express();
const session = require('express-session');
const mysql = require('mysql2');
// our modules
const db = require('./modelSQL.js');
const auth = require('./auth-server.js');

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
app.get("/", renderIndex);
app.get('/api/productListing', getProductListing);
app.get('/api/productListings', getProductListings);
app.post('/api/productListing', postProductListing);
app.put('/api/upvote', upvote);
app.put('/api/downvote', downvote);
// auth stuff
app.post('/api/login', auth.login);

/**
* returns product listing with given id
*/
async function getProductListing(req, res) {
  const listing_id = req.query.listing_id;

  const productListing = await db.productListing(listing_id);

  const buyers = (await db.getBuyersTotal(listing_id)).Buyers;
  productListing['Buyers'] = buyers;

  if(productListing) {
    res.json(productListing);
  } else {
    res.sendStatus(404);
  }
}
/**
* returns all of the product listings
*/
async function getProductListings(req, res) {
  const client = auth.getClient('cookie', req.query.cookie);

  if(client) {
    console.log(`User: ${client.email} just requested product listings!`);
  } else {
    console.log("An anonymous user just requested product listings!");
  }

  let productListings = await db.allProductListings();
  // get buyers
  for(let productListing of productListings) {
    const buyers = (await db.getBuyersTotal(productListing.Listing_id)).Buyers;
    productListing['Buyers'] = buyers;
  }
  // transform listings

  res.json(productListings);
}

/**
* posts a product listing, data in query component
*/
async function postProductListing(req, res) {
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

/**
* updates rating of a product listing
*/
async function upvote(req, res) {
  const listing_id = req.query.listing_id;
  try {
    const result = await db.updateRating(listing_id, 1);
    res.sendStatus(200);
  } catch(e) {
    console.error(e);
    res.sendStatus(404);
  }
}
async function downvote(req, res) {
  const listing_id = req.query.listing_id;
  try {
    const result = await db.updateRating(listing_id, -1);
    res.sendStatus(200);
  } catch(e) {
    //console.error(e);
    res.sendStatus(404);
  }
}

app.get('/api/hashString', getHashedString);
// debug
async function getHashedString(req, res) {
  res.send(auth.hashString(req.query.string));
}
