const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to the Database');
    }catch (err){
        console.log(err);
        throw new Error('Error Connecting to the Database')
    }
}

module.exports = {
    dbConnection
}