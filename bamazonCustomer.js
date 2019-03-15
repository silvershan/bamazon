var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	 host: "localhost",
    port: 3306,
    user: "root",
    password: "99Answer!",
    database: "bamazon_DB"
});

// Create connection to database
connection.connect(function(err) {
	if (err) throw err;
	console.log ('Connected!', connection.threadId);
	// Call function to display all current products
	displayProducts();
	
});

function displayTable (res) {
	var tableArr = [];
	for (var i = 0; i < res.length; i++) {
		// Push on object with product properties to tableArray for each result
		tableArr.push({
			'Product ID': res[i].item_id,
			'Product Name': res[i].product_name,
			'Department': res[i].department_name,
			'Price': '$' + res[i].price,
			'Quantity': res[i].stock_quantity
		});
	}
	console.table(tableArr);
}

function displayProducts () {
	connection.query('SELECT * FROM `products`', function (err, res) {
		if (err) throw err;
		displayTable(res);
		buyProduct();
	});
}

function buyProduct () {
	inquirer.prompt([{
		name: 'item_id',
		message: 'Enter the ID of the product you want to buy.'
	}, {
		name: 'quantity',
		message: 'What quantity would you like to buy?'
	}]).then(function(answer) {
		connection.query('SELECT * FROM `products` WHERE ?', {
			item_id: answer.item_id
		}, function (err, res) {
			if (err) throw err;
			var proName = res[0].product_name;
			var proQuantity = res[0].stock_quantity;
			var total = res[0].price * answer.quantity;
			// Check if enough items in stock to complete sale
			if (answer.quantity <= proQuantity) {
				// Update quantity of product in database
				var newQuantity = proQuantity - answer.quantity;
				connection.query("UPDATE products SET ? WHERE ?", [{
						stock_quantity: newQuantity
					}, {
						item_id: answer.item_id
					}], function(err, res) {
						if (err) throw err;
						// Confirmation of complete sale
						inquirer.prompt([{
							name: 'return',
							message: 'Purchase complete!\nItem: ' + proName + '\nQuantity: ' + answer.quantity + '\nTotal: $' + total,
							type: 'list',
							choices: ['Return']
						}]).then(function(answer) {
							displayProducts();
						});
					}
				);
			} else {
				inquirer.prompt([{
					name: 'error',
					message: 'Error - Not enough in stock',
					type: 'list',
					choices: ['Return']
				}]).then(function(answer) {
					displayProducts();
				});
			}
		});
	});
}