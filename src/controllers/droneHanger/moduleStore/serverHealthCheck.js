const fs = require('fs');
const path = require('path');
const node_ssh = require('node-ssh');
const moment = require('moment');

const ModuleSSD = require('./moduleSSD');
const SCP = require('../../argh/scp');

class ServerHealthCheck extends ModuleSSD{
  constructor(moduleData){
    super(moduleData);
  }
  
  async initScan(eventData, drone){
    const ssh = new node_ssh();

    //console.log(eventData);
    const connSetup = {
      host:  this.url,
      port: this.port,
      readyTimeout: this.timeout,
      username: this.authInfo.user,
      //password: "toga",
      privateKey: this.privKeys + this.authInfo.key,
      passphrase: this.authInfo.pass,      
    }
    eventData.request = connSetup;
    let now = moment();
    eventData.dateTime = now.format('YYYY-MM-DD HH:mm:ss.SSS')
    await ssh.connect(connSetup).then(()=>{
      console.log(`Module ${this.name}: Connection made.`);
    }).catch((err)=>{
      console.log(err);
      eventData.err = true;
      eventData.errorList = err;
      drone.errors = err;
      eventData.shortMsg = "Failed to make connection";
      drone.watchReport = eventData;
      return true;
    });
    const command = this.buildCommand(this.dataPost);
    let remFileName = "";
    await ssh.execCommand(`${command}`).then((result) => {
      if(this.dataPost.exitCode && this.dataPost.exitCodePass != result.code){
        eventData.err = true;
        eventData.errorList = result.stderr;
        drone.errors = result.stderr;
        eventData.shortMsg = "HC script failed to complete.";
        drone.watchReport = eventData;
        return true;
      }
      remFileName = result.stdout;
      eventData.errors = result.stderr;
    }).catch((err)=>{
      //console.log(err);
      eventData.err = true;
      eventData.errorList = err;
      drone.errors = err;
      evendData.shortMsg = "HC script failed to complete.";
      drone.watchReport = eventData;
      return true;
    }); 
    // ***Required!!!  Or it won't release the connection!****
    ssh.dispose();

    const downloadFile = `${this.downloadDir}${remFileName}`
    const remoteFile = `${this.dataReturn.returnFile}`;
    console.log(`Remote file: ${remoteFile}`);
    console.log(`Download file: ${downloadFile}`);
    
    eventData.downloadStart = now.format('HH:mm:ss:SSS');

    const scpData = {
      ...connSetup,
      remoteFile: this.dataReturn.returnFile,
      localFile: downloadFile,
    }

    const scpCall = new SCP(scpData);
    const scpReturn = await scpCall.pullFile();
    //console.log(scpReturn);
    if(scpReturn.err){
      eventData.err = true;
      eventData.errorList = scpReturn.err;
      drone.errors = scpReturn.err;
      evendData.shortMsg = "HC unable to download file";
      drone.watchReport = eventData;
      return true;
    } else if(scpReturn.stderr){
      eventData.errorList = scpReturn.stderr;
    }


    const fileContents = fs.readFileSync(downloadFile, 'utf8');
    const testFile = JSON.parse(fileContents);
    const numCycles = Object.keys(testFile.cycles).length;

    if(numCycles !== this.dataPost.arguments[0]){
      console.log("Number of cycles done doesn't match requested.  This is probably bad.")
    }

    const testData = testFile.cycles[numCycles.toString()];
    if(testData.free){
      const freeParse = require('../../argh/parseLinuxFree');
      const parsedFree = freeParse(testData.free);
      //console.log(parsedFree);
      testData.free = parsedFree;
    }

    console.log(testData.df.split("\n"));

    console.log(testData);

    console.log(Math.floor(new Date() / 1000));
    now = moment();
    eventData.downloadEnd = now.format('HH:mm:ss:SSS');
    eventData.respCode = 0;
    eventData.response = "";
    drone.watchReport = eventData;        
  }


  /**
   * Check Response
   * @param {*} response 
   */
  dataCheck(response){
    const contentType = response.caseless.get('Content-Type').split(";")[0].split("\/")[1];
    let jObject = {};
    if(contentType !== this.returnType){
      this.errors(`Content-Type is incorrect.  Expecting: ${this.returnType} Recieved: ${contentType}`)
      return false;
    }
    if(contentType == "xml"){
      xml2js.parseString(productXML, function (err, result) {
        if(err){
          this.errors(`Unable to parse XML return: ${err}`)
          return false;
        }
        jObject = result;
      });
    } else {
      jObject = JSON.parse(response.body);
    }
    return this.traverseTree(jObject, this.dataReturn);  
  }
}

module.exports = ServerHealthCheck;