const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// setting ejs
app.set("view engine", "ejs");
app.set("views", "views");

// importing models
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/User");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-Item");
const Order = require('./models/order')
const OrderItem = require('./models/order-items')

// importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// getting inserted data from inputs
app.use(bodyParser.urlencoded({ extended: false }));

// using static components setting public folder as a default
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// using components after importing from routes above
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.error404);

Product.belongsTo(User, { constants: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through : OrderItem})

// it helps us to sync our model to the database
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(app.listen(3000))
  .catch((err) => console.log(err));
