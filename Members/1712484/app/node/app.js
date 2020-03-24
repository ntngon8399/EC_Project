const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const user = "pc";
const pass = "1";
const dbname = "meanApp";

Member = require("./model/member");
Product = require("./model/product");
Data = require("./data");
data = new Data(
  "https://tiki.vn/dien-thoai-xiaomi-redmi-note-7-3gb-32gb-hang-chinh-hang-p10596796.html?src=category-page-1789&2hi=0"
);

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://" +
      user +
      ":" +
      pass +
      "@server-yl7q8.mongodb.net/" +
      dbname +
      "?retryWrites=true&w=majority"
  )
  .then(() => {
    // console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connect failed");
  });

var db = mongoose.connection.db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, Post, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res, next) => {
  Member.find().then(documents => {
    res.status(200)
    .json({
      members: documents
    });
  });
});

app.post("/add-member", (req, res, next) => {
  try {
    const member = new Member({
      name: "name",
      studentId: "sid",
      email: "email",
      gitId: "git"
    });
    member.save();
    res.status(201).json({
      message: member
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

app.post("/add-product", (req, res, next) => {
  try {
    const product = new Product({
      id: data._id,
      name: data.name,
      price: data.price,
      img: data.img,
      category: data.category,
      des: data.des
    });
    product.save();
    return res.status(201).json({
      product: product
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

app.get("/get-product", (req, res, next) => {
  Product.find().then(document => {
    return res.status(200).json({
      products: document
    });
  });
});

module.exports = app;
