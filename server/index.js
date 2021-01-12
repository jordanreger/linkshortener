var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = {mongouri};
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err);
  console.log('connected to database /');
  
  app.get('/', (req, res) => {
    res.redirect({domain});
  });

  app.get('/uptime', (req, res) => {
    res.send("online")
  });

  app.post('/new.link', (req, res) => {
    async function getData() {
      const database = client.db("link");
      const collection = database.collection("data");

      if(req.body.url === ''){
        res.redirect({domain});
      }
      else {
        const crumb1 = { id: req.body.id }
        const checkAvailability = await collection.findOne(crumb1);

        if(checkAvailability === null) {
          const crumb2 = { id: req.body.id, url: req.body.url };
          const insertCrumb2 = await collection.insertOne(crumb2);
          res.redirect(`{domain}?link=${req.body.id}`)
        } else {
          res.redirect({domain})
        }
      }
    }
    getData();
  });

  app.get('/ob/:id', (req, res) => {
    async function getData() {
      const database = client.db("link");
      const collection = database.collection("data");
      const crumb1 = { id: req.params.id }
      const getLink = await collection.findOne(crumb1);

      if(getLink !== null) {
        res.redirect(getLink.url);
      }
      else {
        res.redirect({domain});
      }
    }
    getData();
  });
});

app.listen(42069, function() {
  console.log('running               \\');
});
