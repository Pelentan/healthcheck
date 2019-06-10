const fs = require('fs');
const path = require('path');
const node_ssh = require('node-ssh');
const moment = require('moment');

const ModuleSSD = require('./moduleSSD');
const privKeys = '/node/app/src/middleware/vinz_clortho/';

class ReturnJason extends ModuleSSD{
  constructor(moduleData){
    super(moduleData);
  }
  
  initScan(eventData, drone){
    const ssh = new node_ssh();

    //console.log(eventData);
    const connSetup = {
      host:  this.url,
      port: 22,
      readyTimeout: this.timeout,
      username: this.authInfo.user,
      //password: "toga",
      privateKey: privKeys + this.authInfo.key,
      passphrase: this.authInfo.pass,      
    }
    eventData.request = connSetup;
    console.log(connSetup);
    ssh.connect(connSetup).then(()=>{
      console.log("Yay!");
      drone.watchReport = eventData;
    }).catch((err)=>{
      console.log(err);
      eventData.err = true;
      eventData.errorList = err;
      drone.errors = err;
      eventData.shortMsg = "Failed to make connection";
      drone.watchReport = eventData;
    });
        
  }
}

module.exports = ReturnJason;