'use strict'

async function boot() {
  console.log("hi");
}

async function getProductListings() {
  const url = '/api/productListings';
  const response = await fetch(url);
  console.log(await response.json());
}

window.addEventListener("load", boot);
