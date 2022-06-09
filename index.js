require("node-absolute-path");
const express = include("express");
const app = express();
const bodyParser = include("body-parser");
const cors = include("cors");
include("dotenv").config();
const { ApiRoutes } = include("/src/2.routes");
const { db } = include("/src/4.database");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTING =======
ApiRoutes(app);

// ====DATABASE

db.sync();
db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running in ${port}`);
});
