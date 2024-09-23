const express = require("express");
const app = express();

const dbConnect = require("./config/dbCoonect")
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// router import
const userRoutes = require("./routes/userRoutes");

dbConnect();    // Database Connection

// router declaration
app.use("/api/v1/user", userRoutes)





app.listen(PORT, () => {
    console.log(`Server is up and running at PORT ${PORT}`);
})



