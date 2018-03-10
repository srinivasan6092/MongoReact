import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import config from './config';
import apiroute from './api';
import serverRender from './ServerRender';
import authenticated from './authenticated';

const server = express();
server.use(bodyParser.json());
server.use(compression());

server.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
}));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.set('view engine', 'ejs');

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

server.get(['/', '/login'], (req, res) => {
  res.render('index', {
    UserID: 'hello EJS',
    intialMark: serverRender,
  });
});

server.get(['/Myrequest', '/Mytask'], authenticated, (req, res) => {
  res.render('index', {
    UserID: req.user,
    intialMark: serverRender,
  });
});

server.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

server.use('/api', apiroute);

server.use(express.static('public'));
server.listen(config.port, config.host, () => {
  console.log(`listening to port no ${config.port}`);
});
