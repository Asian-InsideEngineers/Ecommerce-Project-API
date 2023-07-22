const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(
  "mongodb+srv://welcomemall2000:shantilaljipatelsir@insideengineers.lc8qbps.mongodb.net/WelcomeStore?retryWrites=true&w=majority"
);

const customer_Routes = require("./routes/customer_Route");
app.use("/api/Customers", customer_Routes);

const categories_Routes = require("./routes/categories_Routes");
app.use("/api/Categories", categories_Routes);

const Products_Routes = require("./routes/product_Routes");
app.use("/api/Products", Products_Routes);

const cart_Routes = require("./routes/cart_Routes");
app.use("/api/carts", cart_Routes);

const order_Routes = require("./routes/order_Routes");
app.use("/api/orders", order_Routes);

// app.get("/", function(req, res){
//     res.json({success: True, Message: "Welcome to inside systems" });

// });

app.listen(2000, () => console.log(`Server started at port: 2000`));
