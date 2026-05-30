import User from "../model/User.js";
import Message from "../model/Message.js";

export const getAllContacts = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-pasword")
        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log(error);
    }
}

export const getMessagesByUserId = async (req, res) => {
};

export const sendMessage = async (req, res)=>{

    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
          }
          if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
          }
          const receiverExists = await User.exists({ _id: receiverId });
          if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
          }

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        //todo : send message in real time if user is online - socket.io 

        res.status(201).json(newMessage);

        
    } catch (error) {
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({message:"Internal Server Error"})
        
    }
}

export const getChatPartners = async (req, res) => {
};