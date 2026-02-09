import ratelimit from "../config/uptash.js";

const rateLimiter = async (req,res,next) => {
    try {
        const ip = req.ip;
        const { success } = await ratelimit.limit(ip);
        if(!success){
            return res.status(429).json({
                success: false,
                message: 'Too many request..',
                statusCode:" 429"
            })
        }
        next()
    } catch (error) {
        console.error(error);
        next(error)
    }
}

export default rateLimiter;