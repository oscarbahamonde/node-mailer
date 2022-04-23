import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';



dotenv.config().parsed

const emails = mongoose.model('Emails', {
  email: String,
  name: String,
  message: String,
  date: Date,
  media: String
})




var transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'hcscomputer1402@gmail.com',
    pass: process.env.APP_PASSWORD
  }
});

var mailOptions = {
  from: 'hcscomputer1402@gmail.com',
  to: "oscar.bahamonde.dev@gmail.com",
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

async function sendEmail() {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/email', async (req, res) => {
  try{
    async()=>{
      await sendEmail();
      await emails.create({
        email: req.body.email,
        name: req.body.name,
        message: req.body.message,
        date: new Date(),
      })
    }
    res.send('Email sent')
  }catch(error){
    res.send(error)
  }
})

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => {
  console.log('http;//localhost:' + app.get('port'));
});