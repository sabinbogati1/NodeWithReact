var passport = require("passport");
var mongoose = require("mongoose");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("./../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);

});


passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});



passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
},

    async (accessToken, refreshToken, profile, done) => {

        const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {

            console.log("the given user is already present... ");
            return  done(null, existingUser);

        }
       
            console.log("Create New   User");
            
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        

    })



);