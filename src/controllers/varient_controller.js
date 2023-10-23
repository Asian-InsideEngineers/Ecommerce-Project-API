const varients_Model = require("../models/varient_Modal");
const varient_Controller = {
  create_Varients: async function (req, res) {
    try {
      const varient_Data = req.body;
      const new_Varients = new varients_Model(varient_Data);
      await new_Varients.save();

      return res.json({
        success: true,
        messsage: "Varient Created",
      });
    } catch (error) {
      return res.json({
        success: false,
        messsage: error,
      });
    }
  },
  fetch_varients: async function (req, res) {
    try {
      const fetch_varients = await varients_Model.find().populate("product");

      return res.json({
        success: true,
        data: fetch_varients,
        message: "Varient Fetched!",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
  fetch_VarientById: async function (req, res) {
    try {
      const productid = req.params.id;
      const varientsbyid = await varients_Model
        .find({
          product: productid,
        })
        .populate("product");

      return res.json({
        success: true,
        data: varientsbyid,
        message: "varients Fetched! using product ID",
      });
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  },
};

module.exports = varient_Controller;
