'use strict'

async function boot() {
  console.log("hi");
}

async function getProductListings(queryContent) {
  let url = '/api/productListings';

  if(queryContent) {
    url = url + '?' + queryContent
  }
  const response = await fetch(url);
  console.log(await response.json());
}

window.addEventListener("load", boot);
