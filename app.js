const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongourl , cookieKey } = require('./config/keys');
const bodyParser = require('body-parser');

mongoose.connect(mongourl)
const app = express();

require('./models/users');
require('./services/passport');

app.use(bodyParser.json());
app.use(cookieSession({
    maxAge : 30 * 24 * 60 * 60 * 1000,
    keys : [ cookieKey ]
}))

app.use(passport.initialize());
app.use(passport.session());




require('./routes/authRoutes')(app);
require('./routes/billingRoute')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/client/build'));
    const path = require('path');
    app.get('*' , (req , res)  => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'))
    })
}

app.listen(process.env.PORT || 8080 , () => {
    console.log('server started')
})