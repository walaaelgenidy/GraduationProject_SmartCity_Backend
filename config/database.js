let mongoose = require('mongoose');

const URL = 
"mongodb+srv://walaagamal:<walaa@1997>@citycluster-ltvmp.mongodb.net/test?retryWrites=true&w=majority";


const Database = async ()=> {

     await mongoose.connect(
        URL , 
        {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

      console.log('db connected');
  }

module.exports = Database;