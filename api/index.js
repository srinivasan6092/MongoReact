import express from 'express';
import MongoClient from 'mongodb';
import passport from 'passport';
import assert from 'assert';
import bcrypt from 'bcryptjs';

const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
const mongodbURL = 'mongodb://localhost:27017';

router.post('/create', (req, res) => {
  // Create the Documnet
  MongoClient.connect(mongodbURL, (err, client) => {
    // assert.equal(null, res.send('Error Connecting to Server'));
    if (err) {
      res.send('Error Connecting to Server');
      return;
    }
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
          client.close();
        }
      });
  });
});

/* router.post('/logindetail', (req, res) => {
  MongoClient.connect(mongodbURL, (err, client) => {
    if (err) {
      res.send('Error Connecting to Server');
      return;
    }
    console.log('Connected successfully to server');
    const mdb = client.db('mydb');

    mdb.collection('registeredUser').findOne({ userName: req.body.userName })
      .then((user) => {
        if (!user) {
        // No User with name found Redirect to login and though The Msg
          res.send('User not Found. Kindly SignUp first');
          client.close();
        } else {
          bcrypt.compare(req.body.hashPassword, user.password, (err1, resp) => {
            if (resp === true) {
              res.send('User Found');
            } else {
              res.send('User Name or Password incorrect');
            }
          });
          // res.send('User Name found.');
          client.close();
        }
      });
  });
}); */

router.post('/logindetail', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      // return res.send(info.message);
      // if (info.message === 'User not Found') { return res.send({ redirect: 'yes', page: '/' }); }
      return res.send({ redirect: 'no', page: info.message });
    }
    req.logIn(user, (err1) => {
      if (err1) { return next(err1); }
      // return res.send(user.userName);
      return res.send({ redirect: 'yes', page: 'Myrequest' });
    });
    return '';
  })(req, res, next);
});

passport.use(new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'hashPassword',
}, ((username, password, done) => {
    MongoClient.connect(mongodbURL, (err, client) => {
      if (err) {
      // res.send('Error Connecting to Server');
        return done(err);
      }
      console.log('Connected successfully to server passport');
      const mdb = client.db('mydb');

      mdb.collection('registeredUser').findOne({ userName: username })
        .then((user) => {
          if (!user) {
            // No User with name found Redirect to login and though The Msg
            client.close();
            return done(null, false, { message: 'User not Found' });
          }
          bcrypt.compare(password, user.password, (err1, resp) => {
            client.close();
            if (resp === true) {
              return done(null, user);
            }
            return done(null, false, { message: 'Incorrect password or Username.' });
          });
          // res.send('User Name found.');
          return '';
        });
      return '';
    });
  })));

export default router;
