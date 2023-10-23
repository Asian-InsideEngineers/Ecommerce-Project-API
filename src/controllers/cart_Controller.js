const cart_models = require("./../models/cart_Model");

const cart_Controller = {
  fetch_Customercart: async function (req, res) {
    try {
      const user = req.params.Customers;
      const find_customercart = await cart_models
        .findOne({ Customers: user })
        .populate("items.varients");

      if (!find_customercart) {
        return res.json({
          success: true,
          data: [],
          message: "buy your favourite products",
        });
      }
      return res.json({
        success: true,
        data: find_customercart.items,
        message: "Cart has been fetched successfully!",
      });
    } catch (ex) {
      res.json({
        success: false,
        message: ex,
      });
    }
  },
  addtoCart: async function (req, res) {
    //if user cart does not exist in mongoDB Or at client side
    try {
      const { varients, Customers, quantity } = req.body;
      const find_User_Cart = await cart_models.findOne({
        Customers: Customers,
      });
      if (!find_User_Cart) {
        const new_User_Cart = new cart_models({ Customers: Customers });

        new_User_Cart.items.push({
          varients: varients,
          quantity: quantity,
        });

        await new_User_Cart.save();

        return res.json({
          success: true,
          data: new_User_Cart,
          message: "Cart has been created",
        });
        //if user cart has existed in mongoDB Or at client side
      }
      const deleted_Items = await cart_models.findOneAndUpdate(
        { Customers: Customers, "items.varients": varients },
        {
          $pull: { items: { varients: varients } },
        },
        { new: true }
      );

      const updated_Cart_add = await cart_models
        .findOneAndUpdate(
          { Customers: Customers },
          {
            $push: { items: { varients: varients, quantity: quantity } },
          },
          { new: true }
        )
        .populate("items.varients");

      return res.json({
        success: true,
        data: updated_Cart_add.items,
        message: "cart hasbeen updated",
      });
    } catch (ex) {
      res.json({
        success: false,
        message: ex,
      });
    }
  },

  removefromCart: async function (req, res) {
    try {
      const { Customers, cartproducts: varients } = req.body;
      const updated_Cart_remove = await cart_models
        .findOneAndUpdate(
          { Customers: Customers },
          { $pull: { items: { varients: varients } } },
          { new: true }
        )
        .populate("items.varients");

      return res.json({
        success: true,
        data: updated_Cart_remove.items,
        message: "Product has been removed",
      });
    } catch (ex) {
      return res.json({
        success: false,
        message: "No! Products for delete operations",
      });
    }
  },
};

module.exports = cart_Controller;
