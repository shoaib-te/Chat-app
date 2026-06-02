import express from "express";
import { authmiddleware } from "../middleware/auth.middleware.js";
import { getUserMessagescontroller, sendMessagecontroller, getMessagecontroller} from "../controller/message.controller.js";

const router = express.Router();
/*    * @route GET /api/message/user
    * @desc Get messages for a user
    * @access Private
*/
router.get("/user",authmiddleware, getUserMessagescontroller
);
/*  * @route GET /api/message/:id
    * @desc Get a message
    * @access Private
*/
router.get("/:id", authmiddleware, getMessagecontroller);



/*  -* @route POST /api/message/send
    -* @desc Send a message
   - * @access Private
*/
router.post("/send/:Id", authmiddleware, sendMessagecontroller);



export default router;