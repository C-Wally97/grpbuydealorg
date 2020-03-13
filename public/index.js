'use strict'

async function boot() {
  const productListings = await getProductListings();
  displayProductListings(productListings);
}

// displays product listings on page
function displayProductListings(productListings) {
  // add data to card
  for(let productListing of productListings) {
    addCard(productListing);

    const card = document.getElementById('card');
    card.id = productListing.Listing_id;

    // display content
    const title = card.querySelectorAll('.card-title')[0];
    title.textContent = productListing.ProductName;

    const dataWrap = document.getElementById("dataWrap");
    dataWrap.setAttribute("id", "completed")
    for (let [key, value] of Object.entries(productListing)) {
      let ele = document.createElement('li');
      ele.classList.add(key);
      ele.textContent = (`${key}: ${value}`);
      dataWrap.append(ele)
    }

    // add upvote and downvote button
    const card_content = card.querySelector('.card-content');

    const voteButtonContainer = document.createElement('div');
    card_content.appendChild(voteButtonContainer);

    // upvote button
    const upvoteButton = document.createElement('button');
    voteButtonContainer.appendChild(upvoteButton);
    upvoteButton.classList.add('voteButton');
    upvoteButton.textContent = '^';
    upvoteButton.onclick = upvoteListing;

    // downvote button
    const downvoteButton = document.createElement('button');
    voteButtonContainer.appendChild(downvoteButton);
    downvoteButton.classList.add('voteButton');
    downvoteButton.textContent = 'v';
    downvoteButton.onclick = downvoteListing;
  }
}

// adds a card to the page
function addCard(data) {
  const main = document.getElementById("main-content");
  const template = document.getElementsByTagName("template")[0];
  const templateClone = template.content.cloneNode(true);
  main.appendChild(templateClone);
}

// api calls
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

window.addEventListener("load", boot);
