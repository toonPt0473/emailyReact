const mongoose = require('mongoose');
const Survey = mongoose.model('surveys')
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require("../middleware/requireCredits");
//const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');
const nodemailer = require('nodemailer');


module.exports = (app) => {
    app.get('/api/surveys/thank/:userid/:surveyid/yes' , async (req , res) => {
        const request = await Survey.findById(req.params.surveyid);
        if(request._user == req.params.userid){
            request.yes += 1;
            await request.save()
        }
        res.send('thx for voting')
    })

    app.get('/api/surveys/thank/:userid/:surveyid/no' , async (req , res) => {
        const request = await Survey.findById(req.params.surveyid);
        if(request._user == req.params.userid){
            request.no += 1;
            await request.save()
        }
        res.send('thx for voting')
    })

    app.post('/api/surveys/', requireLogin , requireCredits , async (req , res) => {
        const { title , subject , body } = req.body;
        const recipients = req.body.emails
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
        var thisSurvey = await survey.save();
        var mailOptions = {
          from: 'rimb9pkminkfordev@gmail.com',
          to: recipients,
          subject: subject,
          html: surveyTemplate(survey , req.user , thisSurvey)
        };
        
        try {
            await transporter.sendMail(mailOptions);
            //await survey.save();
            req.user.credits -= 1 ;
            const user =  await req.user.save();
            res.send(user)
        } catch (err){
            res.status(422).send(err)
        }
    })

    app.get('/api/dashboard', async (req , res) => {
        if(!req.user){
            res.send()
        }
        const userSurvey = await Survey.find({_user : req.user.id})
        res.send(userSurvey)
    })

    app.post('/api/deletesurvey' , async (req , res) => {
        const { id } = req.body
        const deleteSurvey = await Survey.findOneAndRemove({_id : id})
        res.send(deleteSurvey)
    })
}