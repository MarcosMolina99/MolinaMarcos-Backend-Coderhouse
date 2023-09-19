import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema= new mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    message: String
})

const messagesModel = mongoose.model(messageCollection,messageSchema);

export default messagesModel;