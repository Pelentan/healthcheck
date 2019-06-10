const nodemailer = require ('nodemailer');

const userMail = "mylepard@gmail.com"
const pass = "p@nthers have spotz";

// Currently this is identical to the emailer as we aren't using a texting service.
const sendText =(parcel)=>{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: userMail,
        pass: pass
    }
  });

  const emailOptions = {
      from: parcel.from,
      to: parcel.to,
      subject: parcel.subject,
      text: parcel.body
  };

  transporter.sendMail(emailOptions, (error, info)=>{
      if(error){
          console.log(error);
      } else {
          console.log(info);
      }
  });
}

module.exports = sendText;