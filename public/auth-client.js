'use strict'

let cookie;

async function login(email, password) {
  const url = `/api/login?email=${email}&password=${password}`;

  const response = await fetch(url, {method: 'post'});
  if(response.ok) {
    // extract cookie
    const responseContent = await response.json();

    const name = document.createElement('p');
    document.body.appendChild(name);
    name.textContent = `Hello ${responseContent.name}!`;
  } else {
    console.log('failure');
  }
}

function getCookie() {
  return cookie;
}
