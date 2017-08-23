const express = require('express');
const app = express();

app.get('/' , (req , res) => {
    res.send({bye : 'buddy'});
});

app.listen(process.env.PORT || 8080 , () => {
    console.log('server started')
})