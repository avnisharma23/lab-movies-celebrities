const router = require("express").Router();
const { application } = require("express");
const celebrity = require('../models/Celebrity.model')

/* GET celebrities page */


router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});



router.post("/celebrities/create",(req,res) => {
                                                console.log(req.body);
                                                const { name,occupation,catchPhrase } = req.body;
                                                celebrity.create( {name,occupation,catchPhrase})
                                                .catch(error => console.log(error))
                                                if(error)
                                                    {
                                                        res.render('celebrities/new-celebrity')
                                                    }
                                                else
                                                    {
                                                        res.redirect('celebrities/celebrities')
                                                    }
                                            })

//Listing Our Celebrities
   router.get('/celebrities/list',(req,res) => {
                                                    celebrity.find()
                                                        .then(allCelebrity =>{
                                                                                console.log(allCelebrity)
                                                                                res.render('celebrities/celebrities', {allCelebrity})
                                                                            })
                                                                            .catch(error => console.log(error))

                                                })                                      


module.exports = router;