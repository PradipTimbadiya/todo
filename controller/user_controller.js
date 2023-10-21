const UserModel = require('../models/user_model');
const OtpModel = require("../models/otp_model");
const bcrypt = require("bcryptjs");
const { genarateToken, transporter, generateOTP } = require('../utils/genarateToken');

const UserController = {
    signUp: async function (req, res) {
        try {
            const data = req.body;
            const findUser = await UserModel.findOne({ email: data.email });
            if (findUser) {
                const response = { success: false, message: "Email is already exist" };
                return res.status(401).json(response);
            }
            const user = new UserModel(data)
            await user.save();

            const userData = user.getData()

            const userToken = genarateToken(user._id);

            const emailTemp = `
            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <div style="padding: 20px; background-color: white; text-align: center;">
                            <img src="https://media.istockphoto.com/id/1472307744/photo/clipboard-and-pencil-on-blue-background-notepad-icon-clipboard-task-management-todo-check.webp?b=1&s=170667a&w=0&k=20&c=WfRoNKWq5Dr-23RuNifv1kbIR1LVuZAsCzzSH2I3HsY=" alt="Logo" width="200" height="100" style="display: block; margin: 0 auto;">
                                <h1>Welcome to Our Service!</h1>
                                <p>Dear ${userData.name},</p>
                                <p>Thank you for registering with Our app. You're now a part of our community.</p>
                                <p>Your account details:</p>
                                
                                <strong>Username:</strong> ${userData.name}<br>
                                <strong>Email:</strong> ${userData.email}
                                
                                <p>We're excited to have you on board, and you can start using our service right away.</p>
                                <p>If you have any questions or need assistance, please don't hesitate to contact our support team at pradiptimbadiya@gmail.com.</p>
                                <p>Best regards,</p>
                                <p>Todolist</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

            `
            transporter.sendMail({
                from: "projectfirst276@gmail.com",
                to: userData.email,
                subject: "Todolist",
                html: emailTemp
            }, (err, info) => {
                if (err) {

                } else {
                    console.log("Email Sent : " + info.response);
                }
            })
            const response = {
                success: true,
                data: userData,
                message: "New User Created",
                token: userToken,
            };
            return res.json(response);
        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response)
        }
    },
    signIn: async function (req, res) {
        try {
            email = req.body.email;
            password = req.body.password;
            const findUser = await UserModel.findOne({ email: email });

            if (!findUser) {
                const response = { success: false, message: "User Not Exist" };
                return res.status(401).json(response);
            }

            const matchPass = await bcrypt.compare(password, findUser.password);
            if (!matchPass) {
                const response = { success: false, message: "Password is wrong" };
                return res.status(401).json(response);
            }

            const userData = findUser.getData();

            const userToken = genarateToken(findUser._id);
            const response = { success: true, data: userData, message: 'SignIn successfully', token: userToken };
            return res.json(response);
        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response);
        }
    },
    changePassword: async function (req, res) {
        try {
            email = req.body.email;
            password = req.body.password;
            newPassword = req.body.newPassword;

            const findUser = await UserModel.findOne({ email });

            const matchPass = await bcrypt.compare(password, findUser.password);
            if (!matchPass) {
                const response = { success: false, message: "Password is wrong" };
                return res.status(401).json(response);
            }

            findUser.password = newPassword;
            await findUser.save();
            console.log(findUser);

            const response = { success: true, message: "Password is change" };
            return res.json(response);

        } catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response);
        }
    },
    forgotPassword: async function (req, res) {
        try {
            email = req.body.email;
            const findUser = await UserModel.findOne({ email });

            if (!findUser) {
                const response = { success: false, message: "Email is not found" };
                return res.status(401).json(response);
            }

            const otp = generateOTP();
            const mailFormat = `
            <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#f0f0f0">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <div style="padding: 20px; background-color: #ffffff; text-align: center;">
                                <img src="https://media.istockphoto.com/id/1300422159/photo/woman-hand-enter-a-one-time-password-for-the-validation-process-mobile-otp-secure.webp?b=1&s=170667a&w=0&k=20&c=eADS7XcHTFs4kNItYwelOtHYFVbl0RWpSuXJgjFjai4=" alt="OTP Image" width="200" height="200" style="display: block; margin: 0 auto;">
                                    <h1>One-Time Password OTP Verification</h1>
                                    <p>Hello there!</p>
                                    <p>Your OTP code is: <strong style="font-size: 24px;">${otp}</strong></p>
                                    <p>This OTP will expire in 1 minutes.</p>
                                    <p>If you didn't request this OTP, please ignore this email.</p>
                                    <P>Don't share your otp with someone else.</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            </table>
            `

            const mailOptions = {
                to: findUser.email,
                subject: "Forget Password OTP ",
                html: mailFormat,
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    const response = { success: false, message: error.message };
                    return res.status(400).json(response);
                }
                else {
                    await OtpModel.findOneAndDelete({ email: findUser.email })
                    const user = new OtpModel({ email: findUser.email, otp: otp });
                    await user.save();

                    setTimeout(async () => {
                        await OtpModel.findOneAndDelete({ email: findUser.email })
                    }, 1000 * 60)

                    const response = { success: true, message: "Otp Send" };
                    return res.json(response);
                }
            });
        } catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response);
        }
    },
    verifyOtp: async function (req, res) {
        try {
            email = req.body.email;
            otp = req.body.otp;

            const findUser = await OtpModel.findOne({ email });

            if(!findUser) {
                const response = { success: false, message: "otp not sent" };
                return res.status(401).json(response);
            }

            if (findUser.otp != otp) {
                const response = { success: false, message: "otp is wrong" };
                return res.status(401).json(response);
            }
            await OtpModel.findOneAndDelete({ email: findUser.email })
            const response = { success: true, message: "otp is right" };
            return res.json(response);

        } catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response);
        }
    }
}


module.exports = UserController;