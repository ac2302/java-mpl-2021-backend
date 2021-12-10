require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect(process.env.DB_STRING, () => {
	console.log("connected to db");
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: "token" }));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));

// routes
app.use("/auth", require("./routes/auth"));
