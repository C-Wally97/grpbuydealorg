'use strict'

async function boot() {
  console.log("hi");
}

async function getProductListings() {
  addCard();
  const url = '/api/productListings';
  const cardContent = document.getElementById("card-content")
  const response = await fetch(url)
  .then(
    function(response){
      response.json().then(function(data){
        for (var i = 0; i < data.length; i++) {
          for (let ele of data) {
            let eleWrap = document.createElement("li")
            eleWrap.textContent = ele
            cardContent.append(eleWrap)
          }
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

window.addEventListener("load", boot);

function addCard() {
  let main = document.getElementById("main-content");
  let template = document.getElementsByTagName("template")[0];
  let templateClone = template.content.cloneNode(true);
  main.appendChild(templateClone);
}
