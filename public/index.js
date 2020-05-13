'use strict'

let row;

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelectorAll('.modal');
  const modalInit = M.Modal.init(modal);
  row = document.getElementById("cardRow");
  let inputButton = document.getElementById('rangeButton');
  inputButton.addEventListener("click", submitWeightings());
});

async function boot() {
  displayProductListings(await getProductListings());
  displayWeightings(await getWeightings());
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

    //supplier
    const supplierEle = document.createElement('li');
    supplierEle.append(productListing.SupplierName + " - " + productListing.Supplier_rating);
    dataWrap.append(supplierEle)

    //buyers
    const buyersEle = document.createElement('li');
    buyersEle.textContent = "Buyers: "
    buyersEle.append(productListing.Buyers);
    dataWrap.append(buyersEle)

    //date listed
    const listDate = document.createElement('li');
    listDate.textContent = "Date Listed: "
    listDate.append(productListing.Listing_Date);
    dataWrap.append(listDate)

    // image
    const image = document.createElement('img');
    image.classList.add("test")
    dataWrap.append(image);
    image.src = productListing.Image;

    // add upvote and downvote button
    const card_content = card.querySelector('.card-content');
    const voteButtonContainer = document.createElement('div');
    card_content.appendChild(voteButtonContainer);
    let voteNo = document.createElement('p')
    voteNo.classList.add('Product_Rating')
    voteNo.textContent = productListing.Product_Rating
    voteButtonContainer.appendChild(voteNo);

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

// removes all productListings from main container
function removeProductListings() {
  const productListings = document.querySelectorAll('.productListing');
  for(const productListing of productListings) {
    productListing.remove();
  }
}

function displayWeightings(weightings) {
  const rangeFields = document.getElementById("rangeFields");

  for(const weighting of Object.keys(weightings)) {
    const value = weightings[weighting];

    const range = document.createElement("p");
    rangeFields.append(range);
    range.id = weighting;
    range.class = 'range-field';

    const label = document.createElement('label');
    range.appendChild(label);
    label.setAttribute('for', weighting);
    label.textContent = weighting;

    const input = document.createElement('input');
    range.appendChild(input);
    input.id = weighting;
    input.classList.add('weighting-slider');
    input.setAttribute('name', weighting);
    input.setAttribute('type', 'range');
    input.min = 0;
    input.max = 100;
    const rangeValue = document.getElementById(weighting);
    rangeValue.value = value;
  }
}

// sets values for the weightings elements to values passed
function setWeightings(weightings) {
  for(const weighting of Object.keys(weightings)) {
    const slider = document.getElementById(weighting).childNodes[1];
    slider.value = weightings[weighting];
  }
}

// onclick function for weighting submit button
async function submitWeightings() {
  // update ratings
  // get data from DOM
  const product_weight = document.getElementById("Product_rating_weight").childNodes[1].value;
  const supplier_weight = document.getElementById("Supplier_rating_weight").childNodes[1].value;
  const time_weight = document.getElementById("Time_weight").childNodes[1].value;
  const buyer_weight = document.getElementById("Buyer_weight").childNodes[1].value;

  // make api call
  await updateWeightings(product_weight, supplier_weight, time_weight, buyer_weight);

  // redisplay listings
  removeProductListings();
  displayProductListings(await getProductListings());
}

// adds a card to the page
function addCard(data) {
  const main = document.getElementById("main-content");
  const template = document.getElementsByTagName("template")[0];
  const templateClone = template.content.cloneNode(true);
  row.append(templateClone);
  main.appendChild(row);
}

window.addEventListener("load", boot);
