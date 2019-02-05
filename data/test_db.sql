DROP DATABASE IF EXISTS vue_budgetDB;

CREATE DATABASE IF NOT EXISTS vue_budgetDB;

use vue_budgetDB;

SHOW tables;

CREATE TABLE users (
  user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id)
);

