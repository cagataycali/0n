var express = require('express')
var app = express()

app.get('/', (req, res) => {
  res.json({status: true, message: 'Main'});
})

app.get('/add', (req, res) => {
  res.json({status: true, message: 'Add', params: req.query});
})

app.get('/list', (req, res) => {
  res.json({status: true, message: 'List'});
})

app.get('/delete', (req, res) => {
  res.json({status: true, message: 'Delete'});
})

app.get('/check', (req, res) => {
  res.json({status: true, message: 'Check'});
})

app.listen(3000, () => {
  console.log('0nline at 3000!')
})
