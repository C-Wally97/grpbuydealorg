'use strict'

document.addEventListener('DOMContentLoaded', function() {
  let modal = document.querySelectorAll('.modal');
  let modalInit = M.Modal.init(modal);
});

async function boot() {
  const productListings = await getProductListings();
  displayProductListings(productListings);
  // init modal
  const weightings = await getWeightings();
  displayWeightings(weightings);
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

    const rangeValue = document.getElementById(weighting)
    rangeValue.value = value;
  }
}

// adds a card to the page
function addCard(data) {
  const main = document.getElementById("main-content");
  const template = document.getElementsByTagName("template")[0];
  const templateClone = template.content.cloneNode(true);
  main.appendChild(templateClone);
}


window.addEventListener("load", boot);
