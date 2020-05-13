drop database if exists ProductDatabase;
create database ProductDatabase;
use ProductDatabase;

create table if not exists Logins (
  Email varchar(60) primary key unique,
  Password varchar(60) not null
);

create table if not exists Suppliers (
  Supplier_id int primary key auto_increment,
  Email varchar(60) not null,
  Name varchar(60) not null,
  Address varchar(150) unique,
  Town varchar(54) not null,
  Postcode varchar(8) not null,
  constraint FK_SupplierLogin foreign key(Email) references Logins (Email)
);

create table if not exists Users (
  User_id int primary key auto_increment,
  Email varchar(60) not null,
  Name varchar(60) not null,
  Product_rating_weight int default 50,
  Supplier_rating_weight int default 50,
  Time_weight int default 50,
  Buyer_weight int default 50,
  constraint FK_UserLogin foreign key(Email) references Logins (Email)
);

create table if not exists ProductListings (
  Listing_id int primary key auto_increment,
  Name varchar(60) not null,
  Listing_date datetime not null,
  Image varchar(150) default 'https://placebear.com/200/300',
  Supplier_id int not null,
  Product_rating int default 0,
  constraint FK_Supplier foreign key(Supplier_id) references Suppliers (Supplier_id)
);

create table if not exists ProductListings_Users (
  User_id int,
  Listing_id int,
  optIn_date date not null,
  primary key (User_id, Listing_id),
  constraint FK_UserID foreign key(User_id) references Users (User_id),
  constraint FK_ListingID foreign key(Listing_id) references ProductListings (Listing_id)
);
