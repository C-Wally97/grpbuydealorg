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
// aggregation
app.get('/api/weightings', getWeightings);
app.put('/api/weightings', updateWeightings);
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

  if(client) {
    // aggregateContent based on user weightings
    productListings = await aggregateContent(productListings, client);
  }

  res.json(productListings);
}

async function aggregateContent(productListings, client) {
  const weightings = await db.getWeightings(client.email);
  /*
  Product_rating_weight int default 30,
  Supplier_rating_weight int default 30,
  Time_weight int default 30
  */
  const total = weightings.Product_rating_weight + weightings.Supplier_rating_weight + weightings.Time_weight;
  console.log(total);
  const p_ratio = weightings.Product_rating_weight / total;
  const s_ratio = weightings.Supplier_rating_weight / total;
  const t_ratio = weightings.Time_weight / total;
  console.log(p_ratio);
  console.log(s_ratio);
  console.log(t_ratio);

  // assign overall rating to each productListing
  // a productListing has a total rating out of 100
  for(let productListing of productListings) {
    console.log(productListing);
  }

  return productListings;
}

async function getWeightings(req, res) {
  const client = auth.getClient('cookie', req.query.cookie);

  console.log("getting weightings for user: " + client.email);

  const weightings = await db.getWeightings(client.email);

  console.log("weightings are");
  console.log(weightings);
  return weightings;
}

async function updateWeightings(req, res) {
  const client = auth.getClient('cookie', req.query.cookie);

  console.log("updating weightings for user: " + client.email);
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
