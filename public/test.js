'use strict'

// test cases for functionality
async function test() {
  await contentAggregation_test();
}

// content aggregation based on weightings
// order is in terms of listing ids
const setups = [
  {
    'Product_rating_weight': 100,
    'Supplier_rating_weight': 0,
    'Time_weight': 0,
    'Buyer_weight': 0,
    'order': ["2", "3", "4", "5", "7", "9", "1", "6", "8", "10"]
  },
  {
    'Product_rating_weight': 0,
    'Supplier_rating_weight': 100,
    'Time_weight': 0,
    'Buyer_weight': 0,
    'order': ["2", "4", "3", "5", "7", "9", "1", "6", "8", "10"]
  },
  {
    'Product_rating_weight': 0,
    'Supplier_rating_weight': 0,
    'Time_weight': 100,
    'Buyer_weight': 0,
    'order': ["1", "2", "4", "3", "5", "7", "9", "6", "8", "10"]
  },
  {
    'Product_rating_weight': 0,
    'Supplier_rating_weight': 0,
    'Time_weight': 0,
    'Buyer_weight': 100,
    'order': ["2", "4", "3", "5", "1", "6", "7", "9", "8", "10"]
  }
]

async function contentAggregation_test() {
  let pass = true;

  // login
  await login('myEmail@domain.com', 'myPassword');

  for(const setup of setups) {
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
