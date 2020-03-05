'use strict';

const fs = require('fs');
const util = require('util');
const config = require('./config');
const mysql = require('mysql2/promise');

let sql;

/**
* initialise the database, done on server startup
*/
async function init() {
  sql = await mysql.createConnection(config.mysql);
}

/**
* gets records from given table
* @param {string} table to be queried
* @return {records} result of query
*/
async function showAll(table) {
  const query = `SELECT * FROM ${table}`;
  const formattedQuery = sql.format(query);
  const rows = await sql.query(formattedQuery);
  return rows[0];
}

module.exports = {
  init: init,
  showAll: showAll
}
