const { Schema, model } = require("mongoose");

const varients_Schema = Schema({
  title: {
    type: String,
    require: true,
    default: "",
  },
  MRP: {
    type: Number,
    require: true,
    default: "",
  },
  price: {
    type: Number,
    require: true,
    default: "",
  },
  savings: {
    type: String,
    require: true,
    default: "",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  updatedon: { type: Date },
  createdon: { type: Date },
});

varients_Schema.pre("save", function (next) {
  this.updatedon = new Date();
  this.createdon = new Date();

  next();
});

varients_Schema.pre(
  ["update", "updateone", "findoneandupdate"],
  function (next) {
    const update = this.getupdate();
    delete update._id;
    this.updatedon = new Date();

    next();
  }
);

const varient_Model = model("Varients", varients_Schema);

module.exports = varient_Model;
