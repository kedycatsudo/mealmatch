const nodemailer = require(`nodemailer`)
const fs = require('fs')
const handlebars = require('handlebars')
const path = require('path')
// Set up transporter (using Gmail, with app password)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
})

/**
 * Send a KARM donation email using a handlebars HTML template.
 * @param {Object} params
 * @param {string} params.to - Recipient email address
 * @param {string} params.subject - Email subject
 * @param {Object} params.meal - Meal object with fields for the template
 * @returns {Promise} resolves when the email is sent
 */

function sendDonationToKarm({ to, subject, meal }) {
  const templateSrc = fs.readFileSync(
    path.join(__dirname, 'email_templates', 'karm_donation.html'),
    'utf8'
  )
  const template = handlebars.compile(templateSrc)

  //render template with meal data
  const html = template(meal)

  const mailoptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    html,
    text:
      `New KARM Food Donation\n` +
      `Donor: ${meal.ownerName}\n` +
      `Meal: ${meal.mealName}\n` +
      `Servings: ${meal.servings}\n` +
      `Pick up: ${meal.pickUpLoc}\n` +
      `Contact: ${meal.contactPhone}\n` +
      `Use by: ${meal.useBy}\n`,
  }
  return transporter.sendMail(mailoptions)
}

/**
 * Send a meal claim notification email using a handlebars HTML template.
 * @param {Object} params
 * @param {string} params.to - Recipient email address
 * @param {string} params.subject - Email subject
 * @param {Object} params.meal - Meal object with fields for the template
 * @returns {Promise} resolves when the email is sent
 */

function sendClaimNotificationToOwner({ to, subject, meal, text }) {
  const templateSrc = fs.readFileSync(
    path.join(__dirname, 'email_templates', 'donationClaimEmail.html'),
    'utf8'
  )
  const template = handlebars.compile(templateSrc)
  //render template with meal data

  const html = template(meal)

  const mailoptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    html,
    text:
      text ||
      `Your meal "${meal.mealName}" (posted: ${meal.postDate}) was claimed by ${meal.claimedUpBy} at ${meal.claimedUpAt}`,
  }
  return transporter.sendMail(mailoptions)
}
module.exports = { sendDonationToKarm, sendClaimNotificationToOwner }
