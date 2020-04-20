'use strict'

let clientContent = {
  'cookie': null,
  'email': null,
  'name': null
};

async function login() {
  let email = document.getElementById("user_name").value;
  let password = document.getElementById("password").value;
  const url = `/api/login?email=${email}&password=${password}`;
  const response = await fetch(url, {method: 'post'});
  let nameContent = document.getElementById("nameContent");
  if(response.ok) {
    // extract content
    clientContent = await response.json();
    nameContent.textContent = `Hello ${clientContent.name}!`;
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
