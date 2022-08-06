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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  process.env.ROUTE_VIEW_PRODUCT,
  express.static(process.env.PATH_UPLOAD_PRODUCT)
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTING =======
ApiRoutes(app);

// ====DATABASE
app.keepAliveTimeOut = 0 ;

db.sync();
db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running in ${port}`);
});
