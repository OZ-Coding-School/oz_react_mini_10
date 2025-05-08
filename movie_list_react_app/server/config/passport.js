const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user');

passport.use(new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, false, { message: '사용자 없음' });

            const isValid = await user.validatePassword(password);
            if (!isValid) return done(null, false, { message: '비밀번호 오류' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;