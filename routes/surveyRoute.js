const mongoose = require('mongoose');
const Survey = mongoose.model('surveys')
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require("../middleware/requireCredits");
//const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
const nodemailer = require('nodemailer');

module.exports = (app) => {
    app.get('/api/surveys/thank' , (req , res) => {
        res.send('thx for voting')
        res.redirect('/')
    })

    app.post('/api/surveys/', requireLogin , requireCredits , async (req , res) => {
        const { title , subject , body , recipients } = req.body;
        const survey = new Survey({
            title ,
            subject , 
            body ,
            recipients : recipients.split(',').map(email => ({email : email.trim()})),
            _user : req.user.id,
            dateSend : Date.now()
        })
        //sendgrid smtp
        // const mailer = new Mailer(survey , surveyTemplate(survey));
        // mailer.send();
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'rimb9pkminkfordev@gmail.com',
            pass: 'mink123mk'
          }
        });
        
        var mailOptions = {
          from: 'rimb9pkminkfordev@gmail.com',
          to: recipients,
          subject: subject,
          html: surveyTemplate(survey)
        };
        
        try {
            await transporter.sendMail(mailOptions);
            await survey.save();
            req.user.credits -= 1 ;
            const user =  await req.user.save();
            res.send(user)
        } catch (err){
            res.status(422).send(err)
        }
    })
}