const varient_Routes = require("express").Router();

const varient_Controller = require("../controllers/varient_controller");

varient_Routes.post("/", varient_Controller.create_Varients);
varient_Routes.get("/", varient_Controller.fetch_varients);
varient_Routes.get("/Products/:id", varient_Controller.fetch_VarientById);

module.exports = varient_Routes;
