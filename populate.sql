use ProductDatabase;

/* supplier */
insert into Suppliers(Name, Address, Town, Postcode) values ("A company", "An address line 1", "A town", "PO40DP");

/* product listings */
insert into ProductListings(Name, Listing_date, Supplier_id) values ("A product", "20/4/20", 1);
insert into ProductListings(Name, Listing_date, Supplier_id) values ("The next product", "02/01/20", 1);

/* users */
/*
Product_rating_weight int default 30,
Supplier_rating_weight int default 30,
Time_weight int default 30
*/
/* myPassword */
insert into Users(Email, Password, Name) values("myEmail@domain.com", "deb1536f480475f7d593219aa1afd74c", "A guy");
/* myPassword1, etc */
insert into Users(Email, Password, Name, Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_weight) values("myEmail1@domain.com", "aa7124220a41cca0c0d8a105bf5483fa", "A guy1", 0, 100, 0, 0);
insert into Users(Email, Password, Name, Product_rating_weight, Supplier_rating_weight, Time_weight, Buyer_weight) values("myEmail2@domain.com", "8ff9406be0e00f91d777b3aa2a198bf0", "A guy1", 50, 0, 50, 0);

/* product_listings - users */
insert into ProductListings_Users(Listing_id, User_id, optIn_date) values (1, 1, "05/01/20");
insert into ProductListings_Users(Listing_id, User_id, optIn_date) values (2, 1, "08/01/20");
