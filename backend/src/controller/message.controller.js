import UserModule from "../module/User.module.js";
import Message from "../module/Message.module.js";


/*    * @route GET /api/message/user
    * @desc Get messages for a user
    * @access Private
*/
export const getUserMessagescontroller = async (req, res) => {
    const userId = req.user.id;
    try {
        const filteruser= await UserModule.find({_id: {$ne: userId}}).select("-password");
        if(!filteruser){    
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({
            message: "Users found",
            users: filteruser
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
        res.status(200).json(
            message
        )
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
};
/*  * @route POST /api/message/send
    * @desc Send a message
    * @access Private
*/
export const sendMessagecontroller = async (req, res) => {
  try {
    const myid = req.user.id;
    const receiverId = req.params.id;
    const { content, image } = req.body;
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
    res.status(201).json({
      message: "Message sent successfully",
      data: newMessage
    });
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
