'use strict'

async function boot() {
  console.log("hi");
}

async function getProductListings() {
  addCard();
  const url = `/api/productListings?cookie=${cookie}`;
  const cardContent = document.getElementById("card-content");
  const response = await fetch(url)
  .then(
    function(response){
      response.json().then(function(productListings) {
        for (let productListing of productListings) {
          const eleWrap = document.createElement("li");
          eleWrap.textContent = productListing;
          cardContent.append(eleWrap);
        }
      })
    }
  )
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

function addCard() {
  const main = document.getElementById("main-content");
  const template = document.getElementsByTagName("template")[0];
  const templateClone = template.content.cloneNode(true);
  main.appendChild(templateClone);
}

window.addEventListener("load", boot);
