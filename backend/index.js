import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
//* Connect to database */
import connectDB from "./src/config/db.js";
connectDB();
/** Routes */
import authRoute from "./src/router/auth.route.js";
import messageRoute from "./src/router/message.route.js";

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

