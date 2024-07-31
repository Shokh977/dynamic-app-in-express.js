const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.error404);

app.listen(3000);
