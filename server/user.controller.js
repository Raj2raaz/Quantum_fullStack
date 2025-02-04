import User from './user.model.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const generateAccessToken = ( user ) => {
    return jwt.sign(
        { id : user._id, email : user.email, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )
}

export const createUser = async(req, res) => {
    
    try{

        const { name, username, email, password, avatar, role, dob } = req.body;
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message : "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            email,
            password : hashedPassword,
            avatar,
            role, 
            dob
        });
        await newUser.save();
        res.status(201).json({ message : "User created successfully "})
    } catch(error){
        res.status(500).json({ message : "Error registering user", error : error.message })
    }
}


export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email" })
        }
        const isMatach = await bcrypt.compare(password, user.password);
        if(!isMatach){
            return res.status(400).json({ message : "Invalid password" })
        }

        const accessToken = generateAccessToken(user);

        res.status(200).json({
            message : "Login successful",
            accessToken,
            expiresAt : new Date(Date.now() + 1 * 60 * 60 * 1000),
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                dob: user.dob,
            }
        })
    } catch(error){
        console.log("JWT Error: ", error);
        res.status(500).json({ message : "Error while logging in ", error : error.message })
    }
}

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error){
        res.status(500).json({ message: "Error fetching users", error : error.message});
    }

}


