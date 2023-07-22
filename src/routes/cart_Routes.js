const cart_Routes = require("express").Router();
const cart_Controllers = require("./../controllers/cart_Controller");

cart_Routes.post("/", cart_Controllers.addtoCart);
cart_Routes.delete("/", cart_Controllers.removefromCart);
cart_Routes.get("/", cart_Controllers.fetch_Customercart);

module.exports = cart_Routes;
