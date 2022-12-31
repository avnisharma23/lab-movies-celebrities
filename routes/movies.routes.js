const router = require("express").Router();
const movie = require("../models/Movie.model")
const celebrity = require("../models/Celebrity.model")

/* GET movies page */
/* router.get("/movies", (req, res, next) => {
  res.render("movies/movies");
});
 */

router.get("/movies/create",(req,res) => {
                                            console.log("movie route");
                                            
                                            celebrity.find()
                                              .then((allCelebrity) => {
                                                console.log('All Celebrity',{ allCelebrity })
                                                                        res.render("movies/new-movie",{ allCelebrity });
                                                                      })
                                              .catch(error => console.log(error))
  
})

router.post('/movies/create',(req,res) => {

          const { title,genre,plot } = req.body;
          console.log(req.body);
          
            

})

module.exports = router;