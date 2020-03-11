'use strict'

async function boot() {
  const productListings = await getProductListings();
  displayProductListings(productListings);
}

// api call
async function getProductListings() {
  const url = `/api/productListings?cookie=${clientContent.cookie}`;

  const response = await fetch(url);
  if(response.ok) {
    return await response.json();
  } else {
    console.error("Failed to get products.");
  }
}

// displays product listings on page
function displayProductListings(productListings) {
  const cardContent = document.getElementById("card-content");

  for(let productListing of productListings) {
    addCard(productListing);

    const card = document.getElementById('card');
    card.id = '';

    // display content
    const title = card.querySelectorAll('.card-title')[0];
    title.textContent = productListing.ProductName;
  }
}

function addCard(data) {
  const main = document.getElementById("main-content");
  const template = document.getElementsByTagName("template")[0];
  const templateClone = template.content.cloneNode(true);
  main.appendChild(templateClone);
  const cardContent = document.getElementById("card-content");
  const dataWrap = document.getElementById("dataWrap");
  dataWrap.setAttribute("id", "completed")
  for (let [key, value] of Object.entries(data)) {
    let ele = document.createElement('li');
    ele.textContent = (`${key}: ${value}`);
    dataWrap.append(ele)
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

// could be changed to be on click event func
async function upvoteListing(listing_id) {
  const url = `/api/upvote?listing_id=${listing_id}`;

  const response = await fetch(url, {method: 'put'});
  if(response.ok) {
    console.log("product listing rating upvoted!");
  } else {
    console.error('failed to upvote product');
  }
}

// could be changed to be on click event func
async function downvoteListing(listing_id) {
  const url = `/api/downvote?listing_id=${listing_id}`;

  const response = await fetch(url, {method: 'put'});
  if(response.ok) {
    console.log("product listing rating downvoted!");
  } else {
    console.error('failed to downvote product');
  }
}

window.addEventListener("load", boot);
