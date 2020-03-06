'use strict'

let clientContent = {
  'cookie': null,
  'email': null,
  'name': null
};

async function login(email, password) {
  const url = `/api/login?email=${email}&password=${password}`;

  const response = await fetch(url, {method: 'post'});
  if(response.ok) {
    // extract cookie
    clientContent = await response.json();

    const name = document.createElement('p');
    document.body.appendChild(name);
    name.textContent = `Hello ${clientContent.name}!`;
  } else {
    console.log('failure');
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
