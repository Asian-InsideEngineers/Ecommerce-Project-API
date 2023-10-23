const order_Models = require("./../models/order_Model");
const cart_Model = require("./../models/cart_Model");

const order_Controller = {
  create_Order: async function (req, res) {
    try {
      const { Customers: Customers, items } = req.body;
      const new_Order = new order_Models({
        Customers: Customers,
        items: items,
      });

      await new_Order.save();

      await cart_Model.findOneAndUpdate(
        { Customers: Customers._id },
        { items: [] }
      );

      return res.json({
        success: true,
        data: new_Order,
        messsage: "order Placed!",
      });
    } catch (error) {
      return res.json({
        success: false,
        messsage: error,
      });
    }
  },
  fetch_orders: async function (req, res) {
    try {
      const CustomerId = req.params.CustomerId;
      const find_Orders = await order_Models.find({
        "Customers._id": CustomerId,
      });

      return res.json({
        success: true,
        data: find_Orders,
        message: "Orders Fetched!",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
  update_Orders: async function (req, res) {
    try {
      const { orderId, Status } = req.body;
      const update_Customerorder = await order_Models.findOneAndUpdate(
        { _id: orderId },
        { status: Status },
        { new: true }
      );
      return res.json({
        success: true,
        data: update_Customerorder,
        message: "Request Accepted",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
};

module.exports = order_Controller;
