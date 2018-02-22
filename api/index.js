import express from 'express';
import MongoClient from 'mongodb';
import assert from 'assert';

const router = express.Router();
let mdb;
const mongodbURL = 'mongodb://localhost:27017';

MongoClient.connect(mongodbURL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');
  mdb = client.db('mydb');
});

router.post('/create', (req, res) => {
  mdb.collection('registeredUser').insertOne({
    emailID: req.body.emailID,
    userName: req.body.userName,
    password: req.body.hashPassword,
  })
    .then(result => res.send(`User Added ${result}`));
});


export default router;
