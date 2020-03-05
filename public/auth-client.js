'use strict'

async function login(email, password) {
  console.log('making login request...');

  const url = `/api/login?email=${email}&password=${password}`;
  const response = await fetch(url, {method: 'put'});
  if(response.ok) {
    console.log('success');
  } else {
    console.log('failure');
  }
}
