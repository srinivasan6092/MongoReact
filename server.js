import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import config from './config';
import apiroute from './api';
import serverRender from './ServerRender';


const server = express();
server.use(bodyParser.json());
server.use(compression());

server.set('view engine', 'ejs');

server.get(['/', '/login', '/Myrequest'], (req, res) => {
  res.render('index', {
    content: 'hello EJS',
    intialMark: serverRender,
  });
});

server.use('/api', apiroute);

server.use(express.static('public'));
server.listen(config.port, config.host, () => {
  console.log(`listening to port  ${config.port}`);
});
