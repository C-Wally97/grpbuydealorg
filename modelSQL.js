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
  const productFields = 'ProductListings.Name as ProductName, ProductListings.Listing_Date, ProductListings.Product_Rating';
  const supplierFields = 'Suppliers.Name as SupplierName, Suppliers.Supplier_rating';
  const productListings_Users_Fields = 'COUNT(ProductListings_Users.User_id) as Buyers';
  const selectStatement = `SELECT ${productFields}, ${supplierFields}, ${productListings_Users_Fields} FROM ProductListings `;
  const supplierJoin = 'INNER JOIN Suppliers ON Suppliers.Supplier_id = ProductListings.Supplier_id ';
  const productListings_Users_Join = 'INNER JOIN ProductListings_Users ON ProductListings.Listing_id = ProductListings_Users.Listing_id';
  let query = selectStatement + supplierJoin + productListings_Users_Join;
  
  // make query to database
  query = await sql.format(query);
  const rows = await sql.query(query);
  return rows[0];
}

async function insertProductListing(name, supplier_id) {
  const query =  'INSERT INTO ProductListings SET ? ;';

  // get today's date
  let listing_date = new Date();
  listing_date = listing_date.toISOString();

  query = sql.format(query, {name, listing_date, supplier_id});
  return await sql.query(query);
}

async function getUser(email, password) {
    const query = `SELECT * FROM Users WHERE Email = "${email}" AND Password = "${password}" ;`;
    const formattedQuery = sql.format(query);
    const rows = await sql.query(formattedQuery);
    return rows[0][0];
}

module.exports = {
  init: init,
  allProductListings: allProductListings,
  insertProductListing: insertProductListing,
  getUser: getUser
}
