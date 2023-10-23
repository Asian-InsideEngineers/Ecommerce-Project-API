const { Schema, model, trusted } = require("mongoose");

const categories_Schema = new Schema({
  title: { type: String, required: [true, "Categorytitle"] },
  description: { type: String, default: "" },
  image: { type: String, required: true, default: "" },
  updatedon: { type: Date },
  createdon: { type: Date },
});

categories_Schema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdon = new Date();

  next();
});

categories_Schema.pre(
  ["update", "findOneAndUpdate", "updateOne"],
  function (next) {
    const update = this.getUpdate();
    delete update._id;
    this.updatedon = new Date();

    next();
  }
);
const categories_Model = model("Categories", categories_Schema);

module.exports = categories_Model;
