// npm modules
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
// our modules
const db = require('./modelSQL.js');

async function login(req, res) {
    const hash = crypto.createHash('md5');
    const email = req.query.email;
    const password = req.query.password;

    hash.update(password);

    const attempt = await db.getUser(email, hash.digest('hex'));
    if(attempt instanceof Error === false) {
        const currentDate = new Date();
        console.log(`User: ${attempt.Email} just logged in!`);
        session.auth = true;
        session.email = attempt.Email;
    } else {
        console.log("Failed auth attempt!");
    }
}

module.exports = {
  login: login
}
