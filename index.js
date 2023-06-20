require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const shorturl = {};
const isUrl = require('is-url');

let count = 0;
app.post('/api/shorturl', function(req,res){
  const url = req.body.url;
  if(!isUrl(url)){
    res.send({error: 'invalid url'});
    return;
  }
  count += 1;
  shorturl[count] = url;
  res.send({original_url: req.body.url, short_url: count});
})

app.get('/api/shorturl/:id', function( req, res){
  const id = req.params.id;
  const url = shorturl[id];
  res.redirect(url);
})

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('public', function(req,res){

})

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
