const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

function genarateToken(data) {
    const token = jwt.sign({ _id: data }, process.env.SCRET_KEY)
    return token;
}


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "pradiptimbadiya@gmail.com",
        pass: "pradip@8118",
        clientId: '295805594505-bkc6q610hiqr9tgsa7ke28g6pepl6ta5.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04orPP3C1mDrUCgYIARAAGAQSNwF-L9IrWF4xdYPCvPgExa4XB9rKpHld0kjHpVFlUq3pB2W0cvJMAzoGpgfANuNotNhwtEfwNcg'
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
