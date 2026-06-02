import UserModule from "../module/User.module.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import uploadImage from "../lib/Cloudinary.js";

const registercontroller =async (req, res) => {
   try {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await UserModule.findOne({ email });
    if(user){   
        return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword =await bcrypt.hashSync(password, 10);
    const newUser = new UserModule({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });

    await newUser.save();

    res.status(201).json({
         message: "User created successfully" ,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token: token
    });

   } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
   }
}

const logincontroller =async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "Please fill all the fields" });    
        }
        const user = await UserModule.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({
            user: {
                id: user._id,
                name:user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            },
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logoutcontroller = (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
}


const getmecontroller = async (req, res) => {

    try {
        const user = await UserModule.findById(req.user.id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User found",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updatecontroller = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user;

        // Check if a file was actually uploaded via Multer
        if (req.file) {
            // Multer stores file details in req.file (e.g., req.file.path or req.file.filename)
            const localFilePath = req.file.path; 
            
            const profilePictureUrl = await uploadImage(localFilePath);
            if (!profilePictureUrl) {
                return res.status(500).json({ message: "Error uploading image" });
            }

            user = await UserModule.findByIdAndUpdate(
                req.user.id, 
                { name, email, profilePicture: profilePictureUrl }, 
                { returnDocument: 'after' } // ✅ Fixed warning
            );
            
        } else {
            user = await UserModule.findByIdAndUpdate(
                req.user.id, 
                { name, email }, 
                { returnDocument: 'after' } // ✅ Fixed warning
            );
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}




export { registercontroller, logincontroller, logoutcontroller ,getmecontroller, updatecontroller };