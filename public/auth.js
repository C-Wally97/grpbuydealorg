'use strict'

async function login(username, password) {
  console.log('making login request...');

  const url = `/api/login?username=${username}&password=${password}`;
  await fetch(url, {method: 'post');
}
