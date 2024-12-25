require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoRoute = require('./routes/todoRoutes');
const authRoute = require("./routes/authRoute");  // Fixed typo

const App = express();
App.use(express.json());
App.use(cors("http://localhost:3000"));  // CORS settings can be customized if needed

App.use('/todo', todoRoute);
App.use("/auth", authRoute);



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        App.listen(5000, () => {
            console.log("Database connected and server is running on port 5000");
        });
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

// Global error handler
App.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});



