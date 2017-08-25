const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongourl , cookieKey } = require('./config/keys');

mongoose.connect(mongourl)
const app = express();

require('./models/users');
require('./services/passport');

app.use(cookieSession({
    maxAge : 30 * 24 * 60 * 60 * 1000,
    keys : [ cookieKey ]
}))

app.use(passport.initialize());
app.use(passport.session());



require('./routes/authRoutes')(app);



app.listen(process.env.PORT || 8080 , () => {
    console.log('server started')
})