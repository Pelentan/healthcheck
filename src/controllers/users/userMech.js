const sendEmail = require("../heralds/emailer");
const sendText = require("../heralds/texter");

class UserMech{
  constructor(user){
    if(!user.id)return false;
    this._id = user.id;
    this._active = user.active;
    this._name = user.name;
    this._accessLevel = this.setUserLevel(user.accessLevel);
    this._email = user.email;
    this._phone = user.phone;
    this._textProvider = user.textProvider;
    this._schedules = user.schedules;
    this._alertActive = this.checkSchedule();
  }

  checkSchedule(){
    //Hardcoded for now.    
    const active = true;
    return active;
  }

  setUserLevel(level){
    level = parseInt(level);
    return level;
  }

  sendAlert(messagePack){
    //if(!this.name){}
    const parcel = {
      ... messagePack,      
    };

    const alerts = {
      email: {},
      text: {},
    }

    if(this.email){
      parcel.to = this.email;
      parcel.body = messagePack.emailBody;
      //alerts.email =  this.mailout(parcel);
      // console.log("This is event data being sent to email");
      // console.log(parcel.emailBody);
    }

    if(this.textProvider){
      parcel.to = this.phone + "@" + this.textProvider;
      parcel.body = messagePack.textBody;
      // console.log("And this to text");
      // console.log(parcel.textBody);
      //alerts.text = this.textout(parcel);
    }
  }

  async mailout(parcel){
    try{
      const mailResp =  await sendEmail(parcel);
      if(mailResp){console.log("email sent"); console.log(mailResp);}
      return mailResp;
    } catch (err){
      console.log("error: " + err);
      return false;
    }
  }

  async textout(parcel){
    try{
      const textResp = await sendText(parcel);
      if(textResp){console.log("text sent");console.log(textResp);}
      return textResp;
    } catch (err){
      console.log(err);
    }
  }

  get id(){return this._id;}
  get active(){return this._active;}
  get name(){return this._name;}
  get accessLevel(){return this._accessLevel;}
  get email(){return this._email;}
  get phone(){return this._phone;}
  get textProvider(){return this._textProvider;}
  get alertActive(){return this._alertActive;}
  
}

module.exports = UserMech;