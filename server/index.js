// Let's import our required packages for this file.
const express = require("express");
const cors = require("cors");

// Remember to invoke express and set it equal to app.
const app = express();

// Write out our middleware.
app.use(express.json());
app.use(cors());

// Destructure our createMessage function from messageController.
const {createMessage} = require("./messageController.js");

// Let's build out the endpoints of our server.
app.post("/api/messages", createMessage);

// Last part is to listen on our desired port AKA start our server.
app.listen(4004, () => {
    console.log("Server is running on 4004");
})