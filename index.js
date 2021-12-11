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
// app.use(cors({ exposedHeaders: "token" }));
app.use(cors({ exposedHeaders: "token" }));

app.use(require("./middlewares/auth"));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));

// routes
app.use("/auth", require("./routes/auth"));
app.use("/schedule-event", require("./routes/schedule-event"));
