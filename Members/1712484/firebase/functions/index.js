//create functions
const functions = require("firebase-functions");
//controll BE firebase services
const admin = require("firebase-admin");
//create server instance
const express = require("express");
//allow functions to run separate from client
const cors = require("cors");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ec1st-cb32d.firebaseio.com"
});

const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  console.log("Log here");
  return res.status(200).send("first message");
});

exports.app = functions.https.onRequest(app);

//add member
app.post("/api/member-create", (req, res) => {
  (async () => {
    try {
      await db
        .collection("member")
        .doc("/" + req.body.studentId + "/")
        .create({
          studentId: req.body.studentId,
          name: req.body.name,
          email: req.body.email,
          gitId: req.body.gitId
        });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//get all member
app.get("/api/member-list", (req, res) => {
  (async () => {
    try {
      let query = db.collection("member");
      let response = [];
      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            studentId: doc.data().studentId,
            name: doc.data().name,
            email: doc.data().email,
            gitId: doc.data().gitId
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/product-create/:id", (req, res) => {
  (async () => {
    try {
      await db
        .collection("product")
        .doc("/" + req.params.id + "/")
        .create({
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          price: req.body.price,
          brand: req.body.brand
        });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/product-list", (req, res) => {
  (async () => {
    try {
      let query = db.collection("product");
      let response = [];
      await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            name: doc.data().name,
            description: doc.data().description,
            image: doc.data().image,
            price: doc.data().price,
            brand: doc.data().brand
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});
