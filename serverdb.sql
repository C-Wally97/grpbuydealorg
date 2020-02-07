drop database if exists GRPBUY_DB;
create database if not exists GRPBUY_DB;
use GRPBUY_DB;

create table Users (
  id int(10) auto_increment primary key,
  user varchar(60),
  pass varchar(60)
);

INSERT INTO Users VALUES(1, "test", "test");