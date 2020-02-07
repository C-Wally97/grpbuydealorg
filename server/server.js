const express = require('express');
const app = express();
//const db = require('./ModelSQL.js');

async function getDeals(req, res) {
    res.json(deals);
}

app.listen(8080);

app.use('/', express.static('client', {'extensions': ['html']}));

let deals = [
  {
    'id': 1;
    'product': 'Bags';
    'userAmount': 42;
  }
];
