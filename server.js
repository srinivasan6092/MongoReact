import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import apiroute from './api';


const server = express();
server.use(bodyParser.json());

server.set('view engine', 'ejs');

server.get(['/'], (req, res) => {
  res.render('index', {
    content: 'hello EJS',
  });
});

server.use('/api', apiroute);

server.use(express.static('public'));
server.listen(config.port, config.host, () => {
  console.log(`listening to port  ${config.port}`);
});
