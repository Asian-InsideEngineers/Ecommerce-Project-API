const order_Routes = require("express").Router();
const order_Controllers = require("./../controllers/order_Controller");

order_Routes.post("/", order_Controllers.create_Order);
order_Routes.get("/:CustomerId", order_Controllers.fetch_orders);
order_Routes.put("/updateOrderStatus", order_Controllers.update_Orders);

module.exports = order_Routes;
