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
    console.log(productListing);

    addCard();

    const card = document.getElementById('card');
    card.id = '';

    // display content
    const title = card.querySelectorAll('.card-title')[0];
    title.textContent = productListing.ProductName;
  }
}

function addCard() {
  const main = document.getElementById("main-content");
  const template = document.getElementsByTagName("template")[0];
  const templateClone = template.content.cloneNode(true);
  main.appendChild(templateClone);
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

window.addEventListener("load", boot);
