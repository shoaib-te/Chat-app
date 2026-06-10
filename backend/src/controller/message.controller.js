import UserModule from "../module/User.module.js";
import Message from "../module/Message.module.js";
import { usersocketid ,io} from "../../index.js";
import uploadImage from "../lib/Cloudinary.js";



/*    * @route GET /api/message/user
    * @desc Get messages for a user
    * @access Private
*/
export const getUserMessagescontroller = async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    
    try {
        const filteruser= await UserModule.find({_id: {$ne: userId}}).select("-password");
        if(!filteruser||filteruser.length === 0){    
            return res.status(404).json({ message: "No users found" });
        }
       /* un send message in user */
        const UnsendMessage={}

        const promises = await filteruser.map(async (user) => {
            const lastMessage = await Message.findOne({
               sender:user._id , receiver: userId,seen:false
            })
            if(lastMessage > 0){
                UnsendMessage[user._id] = lastMessage.length; 
            }

        });
        await Promise.all(promises);



        res.status(200).json({
            message: "Users found",
            users: filteruser,
            UnsendMessage:UnsendMessage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
/*  * @route GET /api/message/:id
    * @desc Get a message
    * @access Private
*/
export const getMessagecontroller = async (req, res) => {
        const myid = req.user.id;
        const receiverId = req.params.id;

    try {
        const message = await Message.find({
            $or: [
                { sender: myid, receiver: receiverId },
                { sender: receiverId, receiver: myid }
            ]
        });

        await Message.updateMany({
            sender: receiverId,
            receiver:myid ,
        }, {
            $set: { seen: true }
        })
        res.status(200).json({
            message: "Message found",
             message
       } )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};
/*  * @route PUT /api/message/:id
    * @desc Update a message
    * @access Private
*/
export const markMessagecontroller= async (req, res) => {
    const {id}=req.params;

    try {
      const message = await Message.findByIdAndUpdate(
        id,
        { seen: true },
        { new: true }
      );
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json({ success: true, message: "Message marked as seen" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
/*  * @route POST /api/message/send
    * @desc Send a message
    * @access Private
*/
export const sendMessagecontroller = async (req, res) => {
  try {
    const myid = req.user.id;
    const receiverId = req.params.id;
    const { content } = req.body;
    const image = req.file;


    
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage(image); // Upload image and return the URL
    }
    const newMessage = new Message({
      sender: myid,
      receiver: receiverId,
        content,
        image: imageUrl
    });

    await newMessage.save();

    const receiverSockitid=usersocketid[receiverId];
    if(receiverSockitid){
        io.to(receiverSockitid).emit("newMeassage", newMessage)
    }
    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage
    });
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
