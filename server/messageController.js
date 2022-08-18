// Importing the bcryptjs package.
const bcrypt = require("bcryptjs");
// Chats is a faux/fake database because we haven't learned databases yet.
const chats = [];

module.exports = {
    createMessage: (req, res) => {
        console.log("createMessage endpoint hit");

        // Destructure pin and message from the body object. The front end has structured it
        // this way (look into frontend index.js for clarification).
        const {pin, message} = req.body;
        console.log(pin, message);

        // First, let's check if the pin currently exists.
        for(let i = 0; i < chats.length; i++) {
            // Let's compare the pin coming in with hashed versions stored in our chats array.
            const pinExists = bcrypt.compareSync(pin, chats[i].pinHash);

            // If this pin exists and is currently in our chats array...
            if(pinExists) {
                // Access the object at that index. It will contain a pinHash property and a messages property (see msgObj).
                // Add the message we just typed in into its messages array property.
                chats[i].messages.push(message);

                // Logic here is same as below. Copy the object, and delete its pinHash. We don't want ANY sort of password
                // going back to the frontend, whether it's encrypted or not.
                let messagesToReturn = {...chats[i]};
                delete messagesToReturn.pinHash;
                return res.status(200).send(messagesToReturn);
            }
        }

        // Salt represents the complexity of our encryption, in terms of patterns.
        const salt = bcrypt.genSaltSync(10);
        console.log(salt);
        // The hash represents the actual encryption of our password.
        const pinHash = bcrypt.hashSync(pin, salt);
        console.log(pinHash);

        // Write some code to make a new message object WITH THE PIN HASH.
        let msgObj = {
            pinHash, // This is the same as pinHash: pinHash.
            messages: [message]
        }

        // Add this new msgObj to our array of chat messages.
        // This simulates adding a message to our databse.
        // We will NEVER store raw password in our DB, we will always store hashed versions.
        chats.push(msgObj);
        let messageToReturn = {...msgObj};

        // DELETE THE PINHASH FROM OUR OBJECT.
        delete messageToReturn.pinHash;
        res.status(200).send(messageToReturn);
    }
}