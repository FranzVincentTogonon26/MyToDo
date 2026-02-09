import jwt from 'jsonwebtoken'
import User from '../models/User';

const protectedRoutes = async (req,res,next) => {
    // Check if token exist in Authorization Header
    if(!req.headers.authorization && !req.headers.authorization.startsWith('Bearer')){
        return res.status(401).json({
            success: false,
            message: 'Not Authorized. No token provided',
            statusCode: 401
        })
    }

    try {
        // get token from Authorization Headers
        let token = req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Not Authorized. No Token',
                statusCode: 401
            })
        }

        //  Verify Token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(tokenDecode.id).select('-password');

        if(!req.user){
            return res.status(401).json({
                success: false,
                message: 'User not Found.',
                statusCode: 401
            })
        }

        next();

    } catch (error) {
        console.log('Auth middleware error:', error);

        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({
                success: false,
                message: 'Token Expired',
                statusCode: 401
            })
        }

        return res.status(401).json({
            success: false,
            message: 'Not Authorized, Token Failed',
            statusCode: 401
        })
    }

}

export default protectedRoutes;