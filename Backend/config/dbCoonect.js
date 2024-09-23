const mongoose = require("mongoose");

const DB_NAME = "Ecommerce-Project";


const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // console.log(connectionInstance);   
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
    }
}

module.exports = dbConnect;