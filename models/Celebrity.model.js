//  Add your code here

const mongoose = new require("mongoose");
const { Schema } =  mongoose;

const celebritySchema = new Schema({
        name: {
                type:String
              },
occupation : {
                type: String
             },
catchPhrase :{
                type: String
             }

})

const Celebrity = mongoose.model('Celebrity',celebritySchema);

module.exports = Celebrity;

