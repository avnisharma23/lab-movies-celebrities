const router = require("express").Router();
const movie = require("../models/Movie.model")
const celebrity = require("../models/Celebrity.model")

/* GET movies page */
router.get("/movies", (req, res, next) => {
  res.render("movies/movies");
});


 router.get("/movies/create",(req,res) => {
                                            //console.log("movie route");
                                            
                                            celebrity.find()
                                              .then((allCelebrity) => {
                                                //console.log('All Celebrity',{ allCelebrity })
                                                                        res.render("movies/new-movie",{ allCelebrity });
                                                                      })
                                              .catch(error => console.log(error))
  
}) 


   router.post('/movies/create', (req, res) => {
                                                  //console.log(req.body);
                                                  const { title, genre, plot, cast } = req.body;
                                                  //console.log(`Your Movie is ${title}, ${genre}, ${plot}, ${cast}` )
                                              
                                                  movie.create({ title, genre, plot, cast })
                                                    .then(createdMovie => {
                                                      //console.log(`Your movie ${title} has been created`);
                                                      res.redirect('/movies');
                                                    })
                                                    .catch(err => {
                                                      //console.log("Error creating the Movie",err);
                                                      res.render('movies/new-movie')
                                                    })
                                                })

   //Listing Our Celebrity
   router.get('/celebrities/list',(req,res) => {
    celebrity.find()
        .then(allCelebrity =>{
                                //console.log(allCelebrity)
                                res.render('celebrities/celebrities', {allCelebrity})
                            })
                            .catch(error => console.log(error))

})                                               

// Get movies
router.get('/movies/list', (req, res) => {
                                            movie.find()
                                              .then(movies => {
                                                //console.log('movies',movies);
                                                  res.render('movies/movies', { movies })
                                              })
                                              .catch(err => console.log(err));
                                          })

  //Get Movie Details Page     
  
  router.get('/movies/:id',(req,res) => {
                                            //console.log(req.params);
                                            const  movieId  = req.params.id;
                                            //console.log('MovieId',movieId);
                                            movie.findById(movieId)
                                              .populate('cast')
                                              .then(foundMovie => {
                                                                    //console.log('Movie Details',foundMovie);
                                                                    res.render('movies/movie-details',{movies: foundMovie})
                                                                  })
                                                .catch(error => console.log(error))
                                        })


//deleting Movie
router.post('/movies/:id/delete',(req,res) => {
                                                const movieId = req.params.id;
                                                //console.log('MovieID',movieId);
                                                movie.findByIdAndRemove(movieId)
                                                  .then(() => res.redirect('/movies'))
                                                  .catch(error => console.log)
            })

            // edit a movie - get the form
router.get("/movies/:movieId/edit", (req, res)=>{
  console.log('Edit details',req.params);
                                                          const { movieId } = req.params;

                                                          movie.findById(movieId)
                                                          .populate('cast')
                                                          .then((movieToEdit) => {
                                                              celebrity.find()
                                                              .then(celebrities => {
                                                                  res.render("movies/edit-movie", {movie: movieToEdit, celebrities});
                                                              })
                                                          })
                                                          .catch(error => next(error));
});

// edit a movie - update the movie document
router.post("/movies/:movieId/edit", (req, res)=>{
                                                    console.log(req.body);
                                                    const { title, genre, plot, cast } = req.body;
                                                    const { movieId } = req.params;

                                                  movie.findByIdAndUpdate(movieId, { title, genre, plot, cast })
                                                  .then((updatedMovie)=>{
                                                      res.redirect(`/movies/${updatedMovie._id}`)
                                                  })
                                                  .catch(error => next(error));
})


module.exports = router;