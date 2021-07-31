const express = require('express');
const functions = require('firebase-functions')
const app = express();
var admin = require("firebase-admin");
const lineNotify = require('line-notify-nodejs')('ZChWT04llAft7RLGE2CJlfCfCw8O9AilGoHlA1fEPoU');

app.use(express.static("public"));


var serviceAccount = require("./firebasepms.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iot-pms3003.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/Arduino");
var datajsonfirebase;
var datascroll;
ref.on("value", function(snapshot) {
  datajsonfirebase = snapshot.val()
  if(datajsonfirebase.onone != checkdatafromjson){
    console.log("--------------------- "+datajsonfirebase.onone)
    console.log("--------------------- "+checkdatafromjson)
    checkdatafromjson = datajsonfirebase.onone
    if(datajsonfirebase.onone == "1"){
      var dataline = "Is working"
      linenotify(dataline)
    }else if(datajsonfirebase.onone == "0"){
      var dataline = "Not working"
      linenotify(dataline)
    }
    console.log("--------------------- "+checkdatafromjson)
  }else{
    checkdatafromjson = datajsonfirebase.onone
  }
  lineautodata()
})

var datatype = ""
var datatypecheck = ""
var checkdatafromjson

var ref2 = db.ref("/Pmscroll");
ref2.on("value", function(snapshot) {
  var datascrolljson = snapshot.val()
  datascroll = datascrolljson.Scroll
  console.log(datascroll.Scroll)
  lineautodata()
})

function lineautodata(){
  if(datajsonfirebase.onone == "4"){
    if(datascroll >= "51"){
      datatype = "8"
    }else{
      datatype = "9"
    }

    if(datatype != datatypecheck){
      console.log(datatype)
      console.log(datatypecheck)

      if(datascroll > "50"){
          var statuc = " Is working"
          console.log(" Is working")
          linenotify(" Auto -> " + statuc)
      }else{
          var statuc = "Not working"
          console.log("Not working")
          linenotify(" Auto -> " + statuc)
      }
      datatypecheck = datatype
    }else{
      datatypecheck = datatype
    }
  }else{
    datatypecheck = datajsonfirebase.onone
  }
}

function linenotify(dataline){
  lineNotify.notify({
    message: dataline,
  }).then(() => {
    console.log('send completed!');
  });
}

app.get('/moreinfo', (req, res, next) => {
  res.sendFile(__dirname + '/public/moreinfo.html')
})

app.get('/css/adminlte.css', (req, res, next) => {
  res.sendFile(__dirname + '/css/adminlte.css')
})

app.get('/css/adminlte.min.css', (req, res, next) => {
  res.sendFile(__dirname + '/css/adminlte.min.css')
})

app.get('/css/fontawesome-free/css/all.min.css', (req, res, next) => {
  res.sendFile(__dirname + '/css/fontawesome-free/css/all.min.css')
})

app.get('/app/index.js', (req, res, next) => {
  res.sendFile(__dirname + '/app/index.js')
})

app.get('/images/favicon.png', (req, res, next) => {
  res.sendFile(__dirname + '/images/favicon.png')
})

app.get('/css/fontawesome-free/webfonts/fa-solid-900.woff2', (req, res, next) => {
  res.sendFile(__dirname + '/css/fontawesome-free/webfonts/fa-solid-900.woff2')
})
app.get('/css/fontawesome-free/webfonts/fa-solid-900.woff', (req, res, next) => {
  res.sendFile(__dirname + '/css/fontawesome-free/webfonts/fa-solid-900.woff')
})
app.get('/css/fontawesome-free/webfonts/fa-solid-900.ttf', (req, res, next) => {
  res.sendFile(__dirname + '/css/fontawesome-free/webfonts/fa-solid-900.ttf')
})
app.get('/css/bootstrap-4.6.0-dist/js/bootstrap.bundle.min.js', (req, res, next) => {
  res.sendFile(__dirname + '/css/bootstrap-4.6.0-dist/js/bootstrap.bundle.min.js')
})
app.get('/css/bootstrap-4.6.0-dist/css/bootstrap.min.css', (req, res, next) => {
  res.sendFile(__dirname + '/css/bootstrap-4.6.0-dist/css/bootstrap.min.css')
})

app.get('/data/:linedata', (req, res) => {
  res.send('Id is'+req.params.linedata)
  //linenotify(req.params.linedata)
})

exports.app = functions.https.onRequest(app)