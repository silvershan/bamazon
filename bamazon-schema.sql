DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45),
    price DECIMAL (10, 2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("echo", "electronics", 49.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("humidifier", "home", 26.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("instant pot", "home", 79.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fire tablet", "electronics", 49.99, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("diffuser", "home", 15.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("car mount", "car accessories", 7.95, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "home", 27.00, 230);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toaster", "home", 22.99, 160);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("vacuum", "home", 71.99, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sewing machine", "crafts", 142.31, 10);