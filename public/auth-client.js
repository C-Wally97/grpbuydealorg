'use strict'

async function login(email, password) {
  console.log('making login request...');

  const url = `/api/login?email=${email}&password=${password}`;
  await fetch(url, {method: 'post');
}
