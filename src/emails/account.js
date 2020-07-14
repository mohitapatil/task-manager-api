const sgMail = require('@sendgrid/mail')

// const sendAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'mohitapatil1234@gmail.com',
        subject: 'thanks for joining',
        text: `Welcome to the app,${name}. Let me know how you get along with app`
    })
}

const sendCancelationEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'mohitapatil1234@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
// sgMail.send({
//     to: 'mohitapatil1234@gmail.com',
//     from: 'mohitapatil1234@gmail.com',
//     subject: 'My first creation',
//     text: 'I hope this reaches U'

// })


