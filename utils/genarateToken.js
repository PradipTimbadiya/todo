const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
require('dotenv').config()

function genarateToken(data) {
    const token = jwt.sign({ _id: data }, process.env.SECRET_KEY)
    return token;
}


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.UNAME,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOKEN
    },
});

function generateOTP() {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports.genarateToken = genarateToken;
module.exports.transporter = transporter;
module.exports.generateOTP = generateOTP;
