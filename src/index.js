const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')
const config = require("./configs/config");
const productsPath = "/api/products";
const suppliersPath = "/api/suppliers";
const clientsPath = "/api/clients";
const transactionsPath = "/api/transactions";
const usersPath = "/users";

// Intializations
const app = express();

// Settings
app.set("port", process.env.PORT || 8084);

app.set("llave", config.llave);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(productsPath, require("./routes/products-route"));
app.use(suppliersPath, require("./routes/suppliers-route"));
app.use(clientsPath, require("./routes/clients-route"));
app.use(transactionsPath, require("./routes/transactions-route"));
app.use(usersPath, require("./routes/user-route"));


app.use((error, req, res, next) => {
  res.status(400).json({
    status: "error",
    message: error.message,
  });
});

// Starting
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});


