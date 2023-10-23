const customer_Routes = require("express").Router();
const customer_Controller = require("../controllers/customer_controller");

customer_Routes.post("/createAccount", customer_Controller.createAccount);
customer_Routes.post("/signIn", customer_Controller.signIn);
customer_Routes.put("/:id", customer_Controller.Updateuser);
module.exports = customer_Routes;
