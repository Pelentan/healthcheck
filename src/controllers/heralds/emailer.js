const nodemailer = require ('nodemailer');

const userMail = "mylepard@gmail.com"
const password = "p@nthers have spotz";

const sendEmail =(parcel)=> {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: userMail,
            pass: password
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    const emailOptions = {
        from: parcel.from,
        to: parcel.to,
        subject: parcel.subject,
        text: parcel.body
    };
    console.log("sending: ");
    console.log(emailOptions);
    transporter.sendMail(emailOptions, (error, info)=>{
        if(error){
            console.log(error);
        } else {
            console.log(info);
        }
    });
}

module.exports = sendEmail;

