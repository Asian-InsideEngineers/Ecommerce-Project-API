const user_model = require("../models/customer_Model");
const bcrypt = require("bcrypt");

const customer_Controller = {
  createAccount: async function (req, res) {
    try {
      const user_Data = req.body;
      const new_Users = new user_model(user_Data);
      await new_Users.save();

      return res.json({
        success: true,
        data: new_Users,
        message: "New Customer Added!",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  signIn: async function (req, res) {
    try {
      const { email, password } = req.body;
      const find_User = await user_model.findOne({ email: email });
      if (!find_User) {
        return res.json({
          success: false,
          message: "Please Sign up!, your account not found",
        });
      }

      const password_Matching = bcrypt.compareSync(
        password,
        find_User.password
      );

      if (!password_Matching) {
        return res.json({ success: false, message: "Incorrect Password" });
      }

      return res.json({ success: true, data: find_User });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = customer_Controller;
