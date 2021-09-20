var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render("user/signup", {title : "Shopping-cart"})
});
router.post("/singup",(req,res)=>{
  
})

module.exports = router;
