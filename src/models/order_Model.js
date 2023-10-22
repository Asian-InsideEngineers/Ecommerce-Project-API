const { Schema, model } = require("mongoose");

const order_Parameters = new Schema({
  varients: {
    type: Map,
    required: true,
  },
  quantity: {
    default: 1,
    type: Number,
  },
});
const order_Schema = new Schema({
  Customers: {
    type: Map,
    required: true,
  },
  items: {
    type: [order_Parameters],
    ref: "Carts",
    required: true,
  },
  status: {
    type: String,
    default: "Order Placed",
  },

  updatedon: { type: Date },
  createdon: { type: Date },
});

order_Schema.pre("save", function (next) {
  this.updatedon = new Date();
  this.createdon = new Date();

  next();
});

order_Schema.pre(["update", "updateone", "findoneandupdate"], function (next) {
  const update = this.getupdate();
  delete update._id;
  this.updatedon = new Date();

  next();
});

const order_Model = model("Orders", order_Schema);

module.exports = order_Model;
