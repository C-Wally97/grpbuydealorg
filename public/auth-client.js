'use strict'

let clientContent = {
  'cookie': null,
};

async function loginHandler() {
  const email = document.getElementById("user_name").value;
  const password = document.getElementById("password").value;

  await login(email, password);
}
async function login(email, password) {
  const url = `/api/login?email=${email}&password=${password}`;

  const response = await fetch(url, {method: 'post'});
  if(response.ok) {
    // extract content
    const nameContent = document.getElementById("nameContent");
    clientContent = await response.json();
    nameContent.textContent = `Hello ${clientContent.name}!`;

    if(clientContent.loginType == 'user') {
      // add weightings
      const weightings = await getWeightings();
      displayWeightings(weightings);
      setWeightings(weightings)
    } else if(clientContent.loginType == 'supplier') {
      // disable voting buttons
      // add a product listing button
    }

    // redisplay listings
    removeProductListings();
    displayProductListings(await getProductListings());
  } else {
    console.error('Login not found.');
  }
}

// debug
async function hashString(string) {
  const url = `/api/hashString?string=${string}`;
  const response = await fetch(url);
  if(response.ok) {
    console.log(await response.text());
  } else {
    console.error('failed to hash string');
  }
}
