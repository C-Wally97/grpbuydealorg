'use strict'

let clientContent = {
  'cookie': null,
};

async function login() {
  const email = document.getElementById("user_name").value;
  const password = document.getElementById("password").value;

  const url = `/api/login?email=${email}&password=${password}`;

  const response = await fetch(url, {method: 'post'});
  if(response.ok) {
    // extract content
    const nameContent = document.getElementById("nameContent");
    clientContent = await response.json();
    nameContent.textContent = `Hello ${clientContent.name}!`;

    // reload variable parts of page
    setWeightings(await getWeightings());
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
