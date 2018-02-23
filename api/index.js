import express from 'express';
import MongoClient from 'mongodb';
import assert from 'assert';
import bcrypt from 'bcryptjs';

const router = express.Router();
const mongodbURL = 'mongodb://localhost:27017';

router.post('/create', (req, res) => {
  // Create the Documnet
  MongoClient.connect(mongodbURL, (err, client) => {
    assert.equal(null, err);
    console.log('Connected successfully to server');
    const mdb = client.db('mydb');
    /*
    validation
    1. Check whether the user Name is present
    */
    mdb.collection('registeredUser').find({ userName: req.body.userName }).count()
      .then((doccount) => {
        if (doccount === 0) {
          // Create the Documnet
          bcrypt.genSalt(10, (err0, salt) => {
            bcrypt.hash(req.body.hashPassword, salt, (err1, hash) => {
              mdb.collection('registeredUser').insertOne({
                emailID: req.body.emailID,
                userName: req.body.userName,
                password: hash,
              })
                .then((result) => {
                  res.send('User Registered Sucesfully.');
                  client.close();
                });
            });
          });
        } else {
          res.send('User Name already take.');
        }
      });
  });
});


export default router;
