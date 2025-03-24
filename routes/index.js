var express = require('express');
var router = express.Router();

// GET home page
router.get('/', (req, res, next) => {
    // Check if the user is logged in (i.e., if there's a token in the session)
    if (req.session.token) {
      // If the user is already logged in, redirect them to the success page
      res.redirect('/success');  // Automatically redirect to the success page after login
    } else {
      // If the user is not logged in, show the login page or home page
      res.render('index', { title: 'Access Package Builder' });  // Render your home page view or login page
    }
  });
  

module.exports = router;
