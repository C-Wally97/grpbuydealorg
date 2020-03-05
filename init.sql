drop database if exists ProductDatabase;
create database ProductDatabase;
use ProductDatabase;

create table if not exists Suppliers (
  Supplier_id int primary key auto_increment,
  Supplier_rating int default 0,
  Name varchar(60) not null,
  Address varchar(150) unique,
  Town varchar(54) not null,
  Postcode varchar(8) not null
);

create table if not exists ProductListings (
  Listing_id int primary key auto_increment,
  Name varchar(60) not null,
  Listing_date date not null,
  Supplier_id int not null,
  Product_rating int default 0,
  constraint FK_Supplier foreign key(Supplier_id) references Suppliers (Supplier_id)
);

create table if not exists Users (
  User_id int primary key auto_increment,
  Email varchar(60) not null,
  Password varchar(60) not null
);

create table if not exists ProductListings_Users (
  User_id int,
  Listing_id int,
  primary key (User_id, Listing_id),
  constraint fk_01 foreign key(User_id) references Users (User_id),
  constraint fk_02 foreign key(Listing_id) references ProductListings (Listing_id)
);
