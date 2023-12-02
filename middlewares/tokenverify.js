const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
require('dotenv').config();

const verify=async function(req,res,next){
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log(req.headers['authorization']?.split(' '));
        const ticket=await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENTID
    });
    const payload=ticket.getPayload();
    if(!payload)
    {
        const response = { success: false, message: "invalid token" };
        return res.status(400).json(response);
    }
    req.userid=payload['sub'];
    next();
    } catch (error) {
        const response = { success: false, message: error.message };
        return res.status(400).json(response)
    }
}

module.exports=verify;