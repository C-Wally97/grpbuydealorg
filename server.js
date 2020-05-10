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

  productListings = await aggregateContent(productListings, client);
  console.log(productListings);

  res.json(productListings);
}

async function aggregateContent(productListings, client) {
  // get ratio between weightings
  const weightings = await getWeightings_(client);

  const total = weightings.Product_rating_weight + weightings.Supplier_rating_weight + weightings.Time_weight + weightings.Buyer_weight;
  const product_ratio = weightings.Product_rating_weight / total;
  const supplier_ratio = weightings.Supplier_rating_weight / total;
  const time_ratio = weightings.Time_weight / total;
  const buyer_ratio = weightings.Buyer_weight / total;

  // assign overall rating to each productListing
  // a productListing has a total rating out of 100
  for(let productListing of productListings) {
    let score = 0;
    // product rating
    score += productListing.Product_Rating * product_ratio;
    // supplier rating
    score += productListing.Supplier_rating * supplier_ratio;
    // time
    // get days passed since a product was listed
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - productListing.Listing_Date);
    const daysDiff = 1 / Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) * 100;
    score += daysDiff * time_ratio;
    // buyers
    score += productListing.Buyers * buyer_ratio;

    productListing['Score'] = score;
  }

  mergeSort(productListings);

  return productListings;
}

function mergeSort(productListings) {
  // split array in half and then sort out halves
  if(productListings.length > 1) {
    const mid = Math.floor(productListings.length / 2);
    const l = productListings.slice(0, mid);
    const r = productListings.slice(mid);

    mergeSort(l);
    mergeSort(r);

    let i = 0;
    let j = 0;
    let k = 0;

    while(i < l.length && j < r.length) {
      if(l[i].Score < r[j].Score) {
        productListings[k] = l[i];
        i++;
      } else {
        productListings[k] = r[j];
        j++;
      }
      k++;
    }

    while(i < l.length) {
      productListings[k] = l[i];
      i++;
      k++;
    }
    while(j < r.length) {
      productListings[k] = r[j];
      j++;
      k++;
    }
  }
}

async function getWeightings(req, res) {
  const client = auth.getClient('cookie', req.query.cookie);

  res.json(await getWeightings_());
}

async function getWeightings_(client) {
  if(client) {
    console.log("getting weightings for user: " + client.email);

    return await db.getWeightings(client.email);
  } else {
    console.log("providing weightings for anonymous user");

    // default to middle on all scales
    return {Product_rating_weight: 50, Supplier_rating_weight: 50,
      Time_weight: 50, Buyer_weight: 50};
  }
}

async function updateWeightings(req, res) {
  const client = auth.getClient('cookie', req.query.cookie);

  try {
    const result = await db.updateWeightings(client.email, req.query.product_weight, req.query.supplier_weight, req.query.time_weight, req.query.buyer_weight);
    res.sendStatus(200);
  } catch(e) {
    console.error(e);
    res.sendStatus(404);
  }
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
