const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const messagesRoutes = require("./routes/messages");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/whatsapp", { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use("/messages", messagesRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
