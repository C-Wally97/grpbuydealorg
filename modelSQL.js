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

// gets productListing with given id
async function productListing(listing_id) {
  let query = getProductListingQuery();
  query = `${query} WHERE Listing_id = ${listing_id};`;
  query = sql.format(query);
  return (await sql.query(query))[0][0];
}

async function allProductListings() {
  let query = getProductListingQuery() + ';';
  query = sql.format(query);
  const rows = await sql.query(query);
  return rows[0];
}

function getProductListingQuery() {
  // form query
  const productFields = 'ProductListings.Listing_id, ProductListings.Name as ProductName, ProductListings.Listing_Date, ProductListings.Product_Rating, ProductListings.Image';
  const supplierFields = 'Suppliers.Name as SupplierName, Suppliers.Supplier_id as Supplier_id';
  const selectStatement = `SELECT ${productFields}, ${supplierFields} FROM ProductListings `;
  const supplierJoin = 'INNER JOIN Suppliers ON Suppliers.Supplier_id = ProductListings.Supplier_id';
  return selectStatement + supplierJoin;
}

// returns the amount of buyers for a specific listing_id
async function getBuyersTotal(listing_id) {
  let query = `SELECT COUNT(User_id) as Buyers FROM ProductListings_Users WHERE Listing_id = ${listing_id};`;
  query = sql.format(query);
  const rows = await sql.query(query);
  return rows[0][0];
}

async function getSupplierRating(supplier_id) {
  let query = 'SELECT SUM(Product_rating) as Supplier_rating FROM ProductListings';
  query = `${query} WHERE Supplier_id = ${supplier_id};`;
  query = sql.format(query);
  return (await sql.query(query))[0][0];
}

async function insertProductListing(name, image, supplier_id) {
  let query = 'INSERT INTO ProductListings SET ? ;';

  // get today's date
  let listing_date = new Date();
  listing_date = listing_date.toISOString();
  listing_date = listing_date.replace('T', ' ').slice(0, listing_date.length-5)

  query = sql.format(query, {name, image, listing_date, supplier_id});
  return await sql.query(query);
}

// updates rating of a single listing
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

// gets the metric weightings for one user
async function getWeightings(email) {
  let query = `SELECT Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_weight FROM Users WHERE Email = "${email}"`;

  query = sql.format(query);
  return (await sql.query(query))[0][0];
}

async function updateWeightings(email, Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_Weight) {
  let query = `UPDATE Users SET ? WHERE Email = "${email}"`;

  query = sql.format(query, {Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_Weight});
  return await sql.query(query);
}

// auth stuff
async function checkLogin(email, password) {
    let query = `SELECT * FROM Logins WHERE Email = "${email}" AND Password = "${password}" ;`;
    query = sql.format(query);
    const rows = await sql.query(query);
    //return rows[0][0];
    let login = rows[0][0];
    if(login) {
      // check if user or supplier
      if(await getUser(email, password)) {
        return {'login': login, 'loginType': 'user'};
      } else if(await getSupplier(email, password)) {
        return {'login': login, 'loginType': 'supplier'};
      }
    }

    return false;
}
async function getUser(email) {
    let query = `SELECT * FROM Users WHERE Email = "${email}";`;
    query = sql.format(query);
    const rows = await sql.query(query);
    return rows[0][0];
}
async function getSupplier(email) {
    let query = `SELECT * FROM Suppliers WHERE Email = "${email}";`;
    query = sql.format(query);
    const rows = await sql.query(query);
    return rows[0][0];
}

module.exports = {
  init: init,
  productListing: productListing,
  allProductListings: allProductListings,
  getBuyersTotal: getBuyersTotal,
  getSupplierRating: getSupplierRating,
  insertProductListing: insertProductListing,
  updateRating: updateRating,
  getWeightings: getWeightings,
  updateWeightings: updateWeightings,
  getUser: getUser,
  getSupplier: getSupplier,
  checkLogin: checkLogin
}
