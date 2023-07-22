const product_Routes = require("express").Router();

const product_Controller = require("../controllers/product_Controller");

product_Routes.post("/", product_Controller.create_Products);
product_Routes.get("/", product_Controller.fetch_Products);

module.exports = product_Routes;
