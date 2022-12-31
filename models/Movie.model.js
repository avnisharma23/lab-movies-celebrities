const mongoose = new require("mongoose");
const { Schema } =  mongoose;

const movieSchema = new Schema({
    title: {
            type:String
           },

    genre: {
             type: String
           },

    plot: {
            type: String
          },

    cast: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Celebrity'}]
})

const Movie = mongoose.model('Movie',movieSchema);

module.exports = Movie;