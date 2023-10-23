const catergory_model = require("./../models/product_Categories_model");

const category_Controller = {
  createCategories: async function (req, res) {
    try {
      const category_Data = req.body;
      const new_Category = new catergory_model(category_Data);
      await new_Category.save();

      return res.json({
        success: true,
        data: new_Category,
        message: "category created!",
      });
    } catch (ex) {
      return res.json({ success: false, message: "Category error" });
    }
  },

  fetch_Catergories: async function (req, res) {
    try {
      const product_Categories = await catergory_model.find();

      return res.json({
        success: true,
        data: product_Categories,
        message: "Categories Fetched!",
      });
    } catch (ex) {
      return res.json({ success: false, message: "Category fecthing error" });
    }
  },
  fetch_CatergoriesbyID: async function (req, res) {
    try {
      const ID = req.params.id;
      const found_Categories = await catergory_model.findById(ID);
      if (!found_Categories) {
        return res.json({
          success: false,
          message: "Categories not found",
        });
      }

      return res.json({
        success: true,
        data: found_Categories,
        message: "Categories Fetched!",
      });
    } catch (ex) {
      return res.json({ success: false, message: "Category fecthing error" });
    }
  },
};
module.exports = category_Controller;
