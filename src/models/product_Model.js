const { Schema, model } = require("mongoose");

const product_Schema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  title: {
    type: String,
    require: true,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    default: "",
  },
  updatedon: { type: Date },
  createdon: { type: Date },
});

product_Schema.pre("save", function (next) {
  this.updatedon = new Date();
  this.createdon = new Date();

  next();
});

product_Schema.pre(
  ["update", "updateone", "findoneandupdate"],
  function (next) {
    const update = this.getupdate();
    delete update._id;
    this.updatedon = new Date();

    next();
  }
);

const product_Model = model("Products", product_Schema);

module.exports = product_Model;
