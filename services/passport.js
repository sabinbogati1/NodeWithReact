var passport = require("passport");
var mongoose = require("mongoose");
var GoogleStrategy=require("passport-google-oauth20").Strategy;

const keys = require("./../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user,done) =>{
    done(null,user.id);

});


 passport.deserializeUser((id,done) =>{
        User.findById(id)
        .then(user => {
            done(null,user);
        })
 });



passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL : "/auth/google/callback",
    proxy:true
}, (accessToken,refreshToken,profile,done)=>{
        
  //  

  User.findOne({ googleId: profile.id }) 
  .then( (existingUser)=>{
            if(existingUser){

                console.log("the given user is already present... ");
                done(null,existingUser);

             }
            else{
                console.log("Create New   User");
                //don't have User then create new one
                new User({ googleId: profile.id }).save()
                .then(user => done(null,user) )
            }

  })
        

})
);