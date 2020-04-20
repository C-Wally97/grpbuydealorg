'use strict'

async function getProductListing(listing_id) {
  const url = `/api/productListing?listing_id=${listing_id}`;

  const response = await fetch(url);
  if(response.ok) {
    return await response.json();
  } else {
    console.error("Failed to get product.");
  }
}

async function getProductListings() {
  const url = `/api/productListings?cookie=${clientContent.cookie}`;

  const response = await fetch(url);
  if(response.ok) {
    return await response.json();
  } else {
    console.error("Failed to get products.");
  }
}

async function postProductListing(name) {
  const url = `/api/productListing?name=${name}`;

  const response = await fetch(url, {method: 'post'});
  if(response.ok) {
    console.log("product listing posted!");
  } else {
    console.error('failed to list product');
  }
}

async function upvoteListing(ev) {
  const listing_id = ev["target"].parentElement.parentElement.parentElement.parentElement.parentElement.id;

  const url = `/api/upvote?listing_id=${listing_id}`;

  const response = await fetch(url, {method: 'put'});
  if(response.ok) {
    console.log("product listing rating upvoted!");
    // redisplay rating
    const rating = (await getProductListing(listing_id)).Product_Rating;
    const card = document.getElementById(listing_id);
    card.querySelector('.Product_Rating').textContent = rating;
  } else {
    console.error('failed to upvote product');
  }
}

async function downvoteListing(ev) {
  const listing_id = ev["target"].parentElement.parentElement.parentElement.parentElement.parentElement.id;

  const url = `/api/downvote?listing_id=${listing_id}`;

  const response = await fetch(url, {method: 'put'});
  if(response.ok) {
    console.log("product listing rating downvoted!");
    // redisplay rating
    const rating = (await getProductListing(listing_id)).Product_Rating;
    const card = document.getElementById(listing_id);
    card.querySelector('.Product_Rating').textContent = rating;
  } else {
    console.error('failed to downvote product');
  }
}

// gets weightings
async function getWeightings() {
  const url = `/api/weighting?cookie=${clientContent.cookie}`;

  const response = await fetch(url);
  if(response.ok) {
    return response.json();
  } else {
    console.error("failed to get weightings");
  }
}

// updates user controlled weightings
async function updateWeightings(product_weight, supplier_weight, time_weight) {
  let url = '/api/weighting?';
  url += `product_weight=${product_weight}&supplier_weight=${supplierRating}&time_weight=${time_weight}`;

  const response = await fetch(url, {method: 'put'});
  if(response.ok) {
    console.log('weightings updated');
  } else {
    console.error('failed to update weightings');
  }
}

// creates a new account
async function createNewAccount(email, password, name, userType, productRating, supplierRating, time) {
  let url = '/api/login?';
  // required details
  url += `email=${email}&password=${password}&name=${name}&userType=${userType}`;
  // weightings - if defined
  url += `productRating=${productRating}&supplierRating=${supplierRating}&time=${time}`;

  const response = await fetch(url, {method: 'post'});
  if(response.ok) {
    console.log('account created');
  } else {
    console.error('failed to create account');
  }
}
