use ProductDatabase;


/* supplier */
insert into Supplier(Name, Address, Town, Postcode) values ("A company", "An address line 1", "A town", "PO40DP");

/* product listings */
insert into ProductListings(Name, Listing_date, Supplier_id) values ("A product", "01/01/20", 1);

/* users */
insert into Users(Email, Password) values("myEmail@domain.com", "deb1536f480475f7d593219aa1afd74c");

/* product_listings - users */
