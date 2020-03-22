//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

//app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

//If your using express in your node server just add

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Connectin with MongoDB
mongoose.connect("mongodb://localhost:27017/userInfoDB", {useNewUrlParser: true,useUnifiedTopology: true });

const userSchema = {
  fName: String,
  lName: String,
  age:String
};

const User = mongoose.model("User", userSchema);

///////////////////////////////////Requests Targetting all users////////////////////////

app.get('/users',(req,res) =>{
  //User.find();
  User.find(function(err, foundUsers){
    if (!err) {
      
      res.send(foundUsers);
    } else {
      res.send(err);
    }
  });
})
// app.route("/users")

// .get(function(req, res){
//   User.find(function(err, foundUsers){
//     if (!err) {
      
//       res.send(foundUsers);
//     } else {
//       res.send(err);
//     }
//   });
// })

app.post('/users',(req, res) =>{
   console.log(req.body);
   console.log("Hit Api successfully")
   const newUser = new User({
    
     fName: req.body.fName,
     lName: req.body.lName,
     age:req.body.age
   });
   console.log(newUser)
      newUser.save(function(err){
        if (!err){
          res.send("Successfully added a new user."+newUser);
        } else {
          res.send(err);
        }
      });
 })

app.delete('/users',(req, res) =>{

   User.deleteMany(function(err){
     if (!err){
       res.send("Successfully deleted all users.");
     } else {
       res.send(err);
     }
   });
 });

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.get("/users/:fName",(req, res) =>{

  User.findOne({fName: req.params.fName}, function(err, foundUser){
    console.log(req.params.fName);
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send("No users matching that fName was found.");
    }
  });
})




app.listen(8124, function() {
  console.log("Server started on port 8124");
});
