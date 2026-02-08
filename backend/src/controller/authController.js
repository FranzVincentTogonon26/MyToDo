import User from "../models/User.js";
import jwt from 'jsonwebtoken'

// Generate JWT token
const generaToken = (id) => {
    return jwt.sign( { id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    } )

}

export const login = async (req,res,next) => {
    try {
       const { email, password } = req.body;
        // Validate Email and Password
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message: 'Please provide Email and Pawword',
                statusCode: 401
            });
        }
        // Check user credenstials
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials',
                statusCode: 401
            })
        }

        //  Check password macth
        const passwordMatch = await user.matchPassword(password);
        if(!passwordMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
                statusCode: 401
            })
        }

        //  Generate token
        const token = generaToken(user._id);

        // return Success
        res.status(200).json({
            success: true,
            message: 'Login Successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        })

    } catch (error) {
        next(error)
    }
}

export const register = () => {

}