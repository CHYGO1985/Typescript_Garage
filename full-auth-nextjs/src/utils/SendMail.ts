import nodeemailer from 'nodemailer'
import * as handlerbars from 'handlebars'
import dotenv from 'dotenv'

dotenv.config()

const sendEmail = async (
  to: string,
  name: string,
  image: string,
  url: string,
  subject: string,
  template: string,
) => {
  const {
    MAILING_EMAIL,
    MAILING_PASSWORD,
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_PORT,
  } = process.env

  let transport = await nodeemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAILING_EMAIL,
      pass: MAILING_PASSWORD,
    },

    /*
    port: Number(SMTP_PORT),
    host: SMTP_HOST,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
     */
  })

  // html replacement
  const data = handlerbars.compile(template)
  const replacement = {
    name: name,
    email_link: url,
    image: image,
  }
  const html = data(replacement)

  // verify connection
  try {
    await transport.verify()

    // send email
    const options = {
      from: MAILING_EMAIL,
      to,
      subject,
      html,
    }

    await transport.sendMail(options)
  } catch (error) {
    console.log(error)
  }
}

export default sendEmail
