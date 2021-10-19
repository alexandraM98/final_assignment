/* All variables needed for main app */
const express = require("express");
const path = require("path");
const session = require('express-session');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();
const bcrypt = require('bcrypt');
const { ROLE } = require('./data');

/* Require dotenv */
require('dotenv').config();


/* Setting the app port */
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"),function(){
  console.log("Server started on port " + app.get("port"));

});

/* Setting the app views */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //ejs is a JavaScript templating engine and stands for Effective JavaScript

app.use(express.urlencoded({ extended: false})); //This is telling our application that we wanna take the forms for our emails and password and we want build the access into our request variable inside of our post method

/* Using the route files from the web and api folders under routes */
//var routes = require("./routes");
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

/* Setting the user routes */
const userRoutes = require("./routes/api/users");
app.use("/users", userRoutes);

/* Importing the git authentication from routes folder */
const gitAuth = require("./routes/api/githubAuth");
app.use("/githubAuth", gitAuth); 

/* Importing the twitter authentication from routes folder */
const twitterAuth = require("./routes/api/twitterAuth");
app.use("/twitterAuth", twitterAuth); 


app.use(express.json());
app.use(cookieParser()); //used to store our user tokens for the session and also to determine whether they can access certain routes

/* Initialising a session using passport*/
app.use(
  session({
      secret: 'cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
          httpOnly: true, //this cookie is going to be stored only in the server, not in the browser
          secure: false, //because I am using http and not https
          maxAge: 24 * 60 * 60 * 1000,
      },
  })
);

app.use(passport.initialize());
app.use(passport.session());


const users = []

app.post('/signup', async(req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
          id: Date.now().toString(),
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
      })
      res.redirect('/login');
  } catch {
      res.redirect('/signup');
  }
  console.log(users);
})

app.post('/login', function(req, res) {

});

app.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    req.session.destroy();
    res.redirect('/login');
});


/**GitHub Auth starts here....
*/
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to patient view.
    res.redirect('/patient');
  });


  const isAuth = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.redirect("/login");
    }
};

  app.get('/patient', isAuth, (req, res)=>{
    res.render('home/patient');
  });


/**GitHub Auth ends here....
*/


/**Twitter Auth starts here....
*/
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/physician');
  });


  app.get('/physician', isAuth, (req, res)=>{
    res.render('home/physician');
});

/**Twitter Auth ends here....
*/

/* Serialising and deserialising the user */
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  cb(null, id);
});
 

