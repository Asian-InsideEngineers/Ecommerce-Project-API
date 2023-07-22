const cart_models = require("./../models/cart_Model");

const cart_Controller = {
  fetch_Customercart: async function (req, res) {
    const Customers = req.params.Customers;
    const find_customercart = await cart_models.findOne({
      Customers: Customers,
    });

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
      message: "Cart hasbeen fetched successfully!",
    });
  },
  addtoCart: async function (req, res) {
    //if user cart does not exist in mongoDB Or at client side
    try {
      const { Products, Customers, Quantity } = req.body;
      const find_User_Cart = await cart_models.findOne({
        Customers: Customers,
      });

      if (!find_User_Cart) {
        const new_User_Cart = new cart_models({ Customers: Customers });

        new_User_Cart.items.push({
          Products: Products,
          Quantity: Quantity,
        });

        await new_User_Cart.save();

        return res.json({
          success: true,
          data: new_User_Cart,
          message: "Cart has been created",
        });
        //if user cart has existed in mongoDB Or at client side
      }

      const updated_Cart_add = await cart_models.findOneAndUpdate(
        { Customers: Customers },
        { $push: { items: { Products: Products, Quantity: Quantity } } },
        { new: true }
      );
      return res.json({
        success: true,
        data: updated_Cart_add,
        message: "cart hasbeen updated",
      });
    } catch (ex) {
      res.json({
        success: false,
        message: "something went wrong!",
      });
    }
  },

  removefromCart: async function (req, res) {
    try {
      const { Customers, Products } = req.body;
      const updated_Cart_remove = await cart_models.findOneAndUpdate(
        { Customers: Customers },
        { $pull: { items: { Products: Products } } },
        { new: true }
      );

      return res.json({
        success: true,
        data: updated_Cart_remove,
        message: "Product has been removed",
      });
    } catch (ex) {
      return res.json({
        success: false,
        message: "something went wrong",
      });
    }
  },
};

module.exports = cart_Controller;
