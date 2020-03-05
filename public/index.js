'use strict'

async function boot() {
  console.log("hi");
}

async function getProductListings() {
  const url = '/api/productListings';
  const response = await fetch(url);
  console.log(await response.json());
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
