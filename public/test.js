'use strict'

// test cases for functionality
async function test() {

}

// content aggregation based on weightings
// order is in terms of listing ids
const setups = [
  {
    'Product_rating_weight': 100,
    'Supplier_rating_weight': 0,
    'Time_weight': 0,
    'Buyer_weight': 0,
    'order': ["11", "1", "8", "13", "9", "4", "6", "2", "3", "12", "14", "10", "5", "7"]
  }
]

async function contentAggregation_test() {
  let pass = true;

  for(const setup of setups) {
    // login
    await login('myEmail@domain.com', 'myPassword');

    // set weightings
    // make copy of setup and pop order key to get weightings
    const weightings = JSON.parse(JSON.stringify(setup));
    delete weightings['order'];
    setWeightings(weightings);
    // send api call to submit weightings
    await submitWeightings();

    // verify order
    const ids = [];
    // get order
    const pages = document.querySelectorAll('#cardRow');
    for(const page of pages) {
      const cards = page.children
      for(const card of cards) {
        ids.push(card.id);
      }
    }

    if(!compareArrays(setup.order, ids)) {
      pass = false;
    }
  }

  return pass;
}

// checks if two array are the same
function compareArrays(arr1, arr2) {
  // lengths
  if(arr1.length != arr2.length) {
    return false;
  }

  // check contents
  for(let i = 0; i < arr1.length; i++) {
    if(arr1[i] != arr2[i]) {
      return false;
    }
  }

  // else return true
  return true;
}
