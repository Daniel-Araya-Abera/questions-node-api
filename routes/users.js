var express = require('express');
var router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/all', function(req, res, next) {
  User.find({})
        .then(data => {
          console.log("users ---> ");
          console.log(data);
          res.json(data);
        });
  
});

router.post('/register', (req, res, next) => {
    const {firstName, middleName, lastName, username, password, email, role } = req.body;

    let errors = [];

    // // Check required fields
    // if (!firstName || !middleName || !lastName || !username || !password || !email || !role) {
    //   errors.push({ msg: 'Please fill in all fields.' })
    //   res.send("one or more inputs are empty")
    // }
    // Check required fields
    if (!firstName || !middleName || !lastName || !username || !password || !email) {
      errors.push({ msg: 'Please fill in all fields.' });
      res.send("one or more inputs are empty");
    }

    User.find({email:email})
        .then(user => {
          if(user.length > 0) {
            console.log("user already exists");
            console.log(user);
            res.send("user already exists");
          } else {
            const newUser = User({
              firstName,
              middleName,
              lastName,
              username,
              password,
              email,
              role
            });
            console.log("new user, repeat new user ");
            console.log(newUser);
            // res.send("hi");

            // Hash password
            bcrypt.genSalt(12, (err, salt) => 
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                console.log("hashed");
                console.log(hash);
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                      // res.redirect('/users/all');
                      res.status(200).redirect('/');
                    })
                    .catch(err => console.log(err));
              }));



          }
        });

});


router.get("/incorrectlogin", (req,res) => {
  res.send("incorrect login");
});

router.get("/login", (req, res, next) => {
  res.send("login page");
});

router.post("/login", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/users/incorrectlogin"
}));

router.get("/logout", function(req, res){    
  console.log("user is ");
  console.log(req.user);
  req.logout();    
  res.redirect("/users/login");
});


module.exports = router;
