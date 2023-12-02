const passport = require('passport');
const FacebookStrategy=require('passport-facebook-token');
const GoogleStrategy=require('passport-google-token').Strategy;
require('dotenv').config();
const UserModel = require('./models/user_model');


passport.use('facebookToken', new FacebookStrategy({
    clientID:process.env.FACEBOOK_CLIENTID,
    clientSecret:process.env.FACEBOOK_CLIENTSECRET,
    passReqToCallback: true
},async(req,accessToken,refreshToken,profile,done)=>{
    try {
        
        console.log('profile',profile);
        // console.log('refreshToken',refreshToken );
        // console.log('accessToken',accessToken);

        const existingUser = await UserModel.findOne({ "email": "pradip1234@gmail.com" });
        if (existingUser) {
            req.user = existingUser
            return done(null, existingUser);
        }
        const newUser = new UserModel({
              name: profile.name.givenName,
              email: 'pradip4@gmail.com',
        });
        await newUser.save();
        req.user = newUser
        done(null, newUser);

    } catch (error) {
        done(error, false, error.message);
    }
}
))


passport.use('googleToken',new GoogleStrategy({
    clientID:process.env.CLIENTID,
    clientSecret:process.env.CLIENTSECRET,
    passReqToCallback: true
},async(req,accessToken,refreshToken,profile,done)=>{
    try {
        // console.log('profile',profile);
        // console.log('refreshToken',refreshToken );
        // console.log('accessToken',accessToken);

        const existingUser = await UserModel.findOne({ "email": "pradiptimbadiya4@gmail.com" });
        if (existingUser) {
            req.user = existingUser
            return done(null, existingUser);
        }
        const newUser = new UserModel({
              name: profile.name.givenName,
              email: 'pradiptimbadiya4@gmail.com'
        });
        console.log(profile._json.picture);
        await newUser.save();
        req.user = newUser;
        done(null, newUser);

    } catch (error) {
        done(error, false, error.message);
    }
}
))
