const nodemailer = require(`nodemailer`)

//set up transporter (using gmail for example)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
})

//send email funtion

function sendDonationToKarm({ to, subject, text }) {
  const mailoptions = { from: process.env.ADMIN_EMAIL, to, subject, text }
  return transporter.sendMail(mailoptions)
}

module.exports = { sendDonationToKarm }
