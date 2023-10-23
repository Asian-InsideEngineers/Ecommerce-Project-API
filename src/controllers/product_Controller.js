const products_Model = require("../models/product_Model");

const product_Controller = {
  create_Products: async function (req, res) {
    try {
      const product_Data = req.body;
      const new_Product = new products_Model(product_Data);
      await new_Product.save();

      return res.json({
        success: true,
        messsage: "Products Created",
      });
    } catch (error) {
      return res.json({
        success: false,
        messsage: error,
      });
    }
  },
  fetch_Products: async function (req, res) {
    try {
      const product_Model = await products_Model.find().populate("category");

      return res.json({
        success: true,
        data: product_Model,
        message: "Products Fetched!",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
  fetch_ProductsById: async function (req, res) {
    try {
      const CategoryId = req.params.id;
      const product_Model_By_Id = await products_Model.find({
        category: CategoryId,
      });

      return res.json({
        success: true,
        data: product_Model_By_Id,
        message: "Products Fetched! using Category ID",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
};

module.exports = product_Controller;
