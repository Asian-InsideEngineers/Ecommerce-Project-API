// const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const user_Schema = new Schema({
  id: { type: String, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String },
  state: { type: String, default: "Mahrashtra" },
  city: { type: String, default: "Mumbai" },
  address: { type: String, default: "" },
  pincode: { type: Number, default: "" },
  phoneno: { type: Number, default: "" },
  updatedon: { type: Date },
  createdon: { type: Date },
});

user_Schema.pre("save", function (next) {
  this.id = uuid.v1();
  this.updatedon = new Date();
  this.createdon = new Date();

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

user_Schema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate(); // Use getUpdate(), not getupdates()
  delete update._id;
  delete update.id;
  this.updatedon = new Date();
  next();
});

const user_Model = model("Customers", user_Schema);
module.exports = user_Model;
