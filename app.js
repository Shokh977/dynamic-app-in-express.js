const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// setting ejs
app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
const db = require("./util/database");

// importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");


// getting inserted data from inputs
app.use(bodyParser.urlencoded({ extended: false }));
// using static components setting public folder as a default
app.use(express.static(path.join(__dirname, "public")));

// using components after importing from routes above
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.error404);

// listening the port 3000
app.listen(3000);
