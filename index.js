const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { ApiRoutes } = require("./2.routes");
const { db } = require("./4.database");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTING =======
ApiRoutes(app);

// ====DATABASE

db.sync({alter:true});
db.authenticate().then(()=> console.log('berhasil terkoneksi dengan database'))
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running in ${port}`);
});
