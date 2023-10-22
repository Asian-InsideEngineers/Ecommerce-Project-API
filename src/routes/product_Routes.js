const product_Routes = require("express").Router();

const product_Controller = require("../controllers/product_Controller");

product_Routes.post("/", product_Controller.create_Products);
product_Routes.get("/", product_Controller.fetch_Products);
product_Routes.get("/Categories/:id", product_Controller.fetch_ProductsById);

module.exports = product_Routes;
