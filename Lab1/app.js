const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
  name:"AuthCookie",
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
  }))
  ///////////////////////////////////////////////////When the user tries to post into something. POST BLOG
   app.post('/blog', (req, res, next) => {
      if (!req.session.user) {
        return res.redirect('/blog');
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        next();
      }
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  app.post('/blog/login', (req, res, next) => {
      if (req.session.user) {
        return res.redirect('/blog');
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        next();
      }
    });
 
  ////////////////////////////////////////////////////////////////////////////////////////////PUT BLOG
  app.put('/blog/:id', (req, res, next) => {
      if (!req.session.user) {
        return res.redirect('/blog');
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        next();
      }
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////POST COMMENT
  app.post('/blog/comments', (req, res, next) => {
      if (!req.session.user) {
        return res.redirect('/blog');
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        next();
      }
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////PATCH BLOG
  app.patch('/blog/:id', (req, res, next) => {
    
      if (!req.session.user) {
        return res.redirect('/blog');
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        next();
      }
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////Delete Comment
  app.delete('/blog/:blogId/:commentId', (req, res, next) => {
    
      if (!req.session.user) {
        return res.redirect('/blog');
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        next();
      }
  });
configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  let i = 3; 
  console.log('Your routes will be running on http://localhost:3000');
});