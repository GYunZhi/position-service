var express = require('express')
var app = express()

// Set up mongoose connection
var mongoose = require('mongoose')
// mongodb://<user>:<pwd>@<host>:<port>/<database>
var mongoDB = 'mongodb://localhost:27017/position-service'
mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB连接异常:'))

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 注册路由
var position = require('./routes/position')
app.use('/position', position)


// error handler
app.use(function(err, req, res, next) {
  res.statusCode = 404
  res.end('Not Found')
})

var port = 8888
app.listen(port, () => {
  console.log('仓位记录管理服务运行中...')
})
