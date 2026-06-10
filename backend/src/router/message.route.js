import express from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { getUserMessagescontroller, sendMessagecontroller, getMessagecontroller, markMessagecontroller} from "../controller/message.controller.js";
import upload from "../lib/multer.js";

const router = express.Router();
/*    * @route GET /api/message/user
    * @desc Get messages for a user
    * @access Private
*/
router.get("/user", authmiddleware, getUserMessagescontroller);

/*  * @route GET /api/message/:id
    * @desc Get a message
    * @access Private
*/
router.get("/:id", authmiddleware, getMessagecontroller);

/*  * @route PUT /api/message/:id
    * @desc Update a message
    * @access Private
*/
router.put("mark/:id", authmiddleware, markMessagecontroller);


/*  * @route POST /api/message/send/:id
    * @desc Send a message
    * @access Private
*/
router.post("/send/:id", authmiddleware,upload.single("image"), sendMessagecontroller);

export default router;