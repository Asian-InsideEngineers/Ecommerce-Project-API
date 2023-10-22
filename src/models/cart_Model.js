const { Schema, model } = require("mongoose");

const schema_For_Cartitem = new Schema({
  varients: {
    type: Schema.Types.ObjectId,
    ref: "Varients",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const cart_Schema = new Schema({
  Customers: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  items: {
    type: [schema_For_Cartitem],
    required: true,
  },

  updatedon: { type: Date },
  createdon: { type: Date },
});

cart_Schema.pre("save", function (next) {
  this.updatedon = new Date();
  this.createdon = new Date();

  next();
});

cart_Schema.pre(["update", "updateone", "findoneandupdate"], function (next) {
  const update = this.getupdate();
  delete update._id;
  this.updatedon = new Date();

  next();
});

const cart_Model = model("Carts", cart_Schema);

module.exports = cart_Model;
