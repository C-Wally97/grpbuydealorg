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
      // add a product listing button
      const nav = document.getElementById('nav-mobile');
      const li = document.createElement('li');
      nav.appendChild(li);

      const addProductbutton = document.createElement('button');
      li.appendChild(addProductbutton);
      addProductbutton.classList.add('waves-effect');
      addProductbutton.classList.add('waves-light');
      addProductbutton.classList.add('btn');
      addProductbutton.classList.add('modal-trigger');
      addProductbutton.href = '#addProdModal';
      addProductbutton.type = 'submit';
      addProductbutton.textContent = 'Add product';

      const modal = document.querySelectorAll('.modal');
      const modalInit = M.Modal.init(modal);
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
