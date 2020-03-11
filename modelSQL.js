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

async function allProductListings() {
  // form query
  const productFields = 'ProductListings.Listing_id, ProductListings.Name as ProductName, ProductListings.Listing_Date, ProductListings.Product_Rating';
  const supplierFields = 'Suppliers.Name as SupplierName, Suppliers.Supplier_rating';
  const selectStatement = `SELECT ${productFields}, ${supplierFields} FROM ProductListings `;
  const supplierJoin = 'INNER JOIN Suppliers ON Suppliers.Supplier_id = ProductListings.Supplier_id ';
  let query = selectStatement + supplierJoin;

  // make query to database
  query = await sql.format(query);
  const rows = await sql.query(query);
  return rows[0];
}

// returns the amount of buyers for a specific listing_id
async function getBuyersTotal(listing_id) {
  let query = `SELECT COUNT(User_id) as Buyers FROM ProductListings_Users WHERE Listing_id = ${listing_id};`;
  query = sql.format(query);
  const rows = await sql.query(query);
  return rows[0][0];
}

async function insertProductListing(name, supplier_id) {
  const query = 'INSERT INTO ProductListings SET ? ;';

  // get today's date
  let listing_date = new Date();
  listing_date = listing_date.toISOString();

  query = sql.format(query, {name, listing_date, supplier_id});
  return await sql.query(query);
}

async function updateRating(Listing_id, direction) {
  // get current rating
  let getQuery = `SELECT Product_Rating FROM ProductListings WHERE Listing_id = ${Listing_id};`;
  getQuery = sql.format(getQuery);

  let Product_Rating = (await sql.query(getQuery))[0][0].Product_Rating;
  Product_Rating = Product_Rating + direction;

  let query = `UPDATE ProductListings SET ? WHERE Listing_id = ${Listing_id};`;

  query = sql.format(query, {Listing_id, Product_Rating});
  return await sql.query(query);
}

async function getUser(email, password) {
    let query = `SELECT * FROM Users WHERE Email = "${email}" AND Password = "${password}" ;`;
    query = sql.format(query);
    const rows = await sql.query(query);
    return rows[0][0];
}

module.exports = {
  init: init,
  allProductListings: allProductListings,
  getBuyersTotal: getBuyersTotal,
  insertProductListing: insertProductListing,
  updateRating: updateRating,
  getUser: getUser
}
