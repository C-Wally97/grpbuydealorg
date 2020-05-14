use ProductDatabase;

/* login */
/* myPassword */
insert into Logins(Email, Password) values ("company@domain.com", "deb1536f480475f7d593219aa1afd74c");
insert into Logins(Email, Password) values ("company1@domain.com", "deb1536f480475f7d593219aa1afd74c");
insert into Logins(Email, Password) values ("company2@domain.com", "deb1536f480475f7d593219aa1afd74c");
/* myPassword */
insert into Logins(Email, Password) values ("myEmail@domain.com", "deb1536f480475f7d593219aa1afd74c");
/* myPassword1 */
insert into Logins(Email, Password) values ("myEmail1@domain.com", "aa7124220a41cca0c0d8a105bf5483fa");
/* myPassword2 */
insert into Logins(Email, Password) values ("myEmail2@domain.com", "8ff9406be0e00f91d777b3aa2a198bf0");

/* users */
/* myPassword */
insert into Users(Email, Name) values("myEmail@domain.com", "A guy");
/* myPassword1, etc */
insert into Users(Email, Name, Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_weight) values("myEmail1@domain.com", "A guy1", 0, 100, 0, 0);
insert into Users(Email, Name, Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_weight) values("myEmail2@domain.com", "A guy1", 50, 0, 50, 0);

/* supplier */
insert into Suppliers(Email, Name, Address, Town, Postcode) values ("company@domain.com", "company", "address", "town", "PO40DP");
insert into Suppliers(Email, Name, Address, Town, Postcode) values ("company1@domain.com", "company1", "address1", "town1", "PO40DP");
insert into Suppliers(Email, Name, Address, Town, Postcode) values ("company2@domain.com", "company2", "address2", "town2", "PO40DP");

/* product listings */
insert into ProductListings(Name, Listing_date, Image, Supplier_id) values ("product", "20/4/20", "/images/myImage.png", 1);
insert into ProductListings(Name, Listing_date, Supplier_id, Product_rating) values ("product1", "02/01/20", 1, 100);
insert into ProductListings(Name, Listing_date, Supplier_id, Product_rating) values ("product2", "02/01/20", 2, 100);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product3", "02/01/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product4", "02/01/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product5", "02/01/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product6", "02/01/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product7", "02/01/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product8", "02/01/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("product9", "02/01/20", 1);

/* product_listings - users */
insert into ProductListings_Users(Listing_id, User_id, optIn_date) values (1, 1, "05/01/20");
insert into ProductListings_Users(Listing_id, User_id, optIn_date) values (2, 1, "08/01/20");
