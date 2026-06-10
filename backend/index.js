import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
//* Connect to database */
import connectDB from "./src/config/db.js";
connectDB();

//* Socket.io */
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});
// sall online use store
export const usersocketid= {};


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
// give me all user sockit id
    const userid=socket.handshake.query.userId;

// add to all user id in usersockitid store in key :valu
    if(userid) usersocketid[userid]=socket.id;
    console.log(usersocketid);
// 
    io.emit("getonlineuser",Object.keys(usersocketid))

    socket.on("disconnect",()=>{
       console.log(`User disconnected: ${socket.id}`);
       delete usersocketid[userid];
       io.emit("getonlineuser",Object.keys(usersocketid))
    })
     
   
})








/** Routes */
import authRoute from "./src/router/auth.route.js";
import messageRoute from "./src/router/message.route.js";

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);




server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

