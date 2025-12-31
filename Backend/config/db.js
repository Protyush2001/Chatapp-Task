const mongoose = require("mongoose");


const configDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("MongoDB is connected to:", mongoose.connection.name);

    }catch(err){
        console.log("Error connecting to DB",err);
    }
}

module.exports = configDB;