CREATE DATABASE stored_xss;
USE stored_xss;


1.CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


2.CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    comment TEXT
);


After creating the Database and Tables including the values then create a new user in the Database
this database creation is mandatory to prevent the conflict of the other database privileges.

Follow the below steps to setup new user for above stored_xss database

STEP:1 : Create the new user

CREATE USER 'XSSDEMO'@'localhost'
IDENTIFIED BY 'XSSAttack';

STEP:2 : Grant all privileges to above user and database

GRANT ALL PRIVILEGES on stored_xss.* TO 'XSSDEMO'@'locahost';

STEP:3 : Check whether the user is created or not on particular database

SELECT USER, HOST FROM mysql.db WHERE db="stored_xss";


