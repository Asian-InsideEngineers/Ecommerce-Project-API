const { Schema, model } = require("mongoose");

const order_Parameters = new Schema({
  Products: {
    type: Map,
    default: 1,
    required: true,
  },
  Quantity: {
    type: Number,
    default: 1,
  },
});
const order_Schema = new Schema({
  Customers: {
    type: Map,
    required: true,
  },
  items: {
    type: [order_Parameters],
    ref: "Customers",
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
