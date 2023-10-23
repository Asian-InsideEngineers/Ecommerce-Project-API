const category_Routes = require("express").Router();
const category_Controller = require("./../controllers/product_Categories_Controller");

category_Routes.post("/", category_Controller.createCategories);
category_Routes.get("/", category_Controller.fetch_Catergories);
category_Routes.get("/:id", category_Controller.fetch_CatergoriesbyID);

module.exports = category_Routes;
