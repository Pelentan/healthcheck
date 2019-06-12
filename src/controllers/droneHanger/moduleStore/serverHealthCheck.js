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
    await ssh.execCommand(`${command}`).then((result) => {
      if(this.dataPost.exitCode && this.dataPost.exitCodePass != result.code){
        eventData.err = true;
        eventData.errorList = result.stderr;
        drone.errors = result.stderr;
        eventData.shortMsg = "HC script failed to complete.";
        drone.watchReport = eventData;
        return true;
      }
      eventData.errors = result.stderr;
    }).catch((err)=>{
      console.log("Woopsy!");
      console.log(err);
      eventData.err = true;
      eventData.errorList = err;
      drone.errors = err;
      evendData.shortMsg = "HC script failed to complete.";
      drone.watchReport = eventData;
      return true;
    }); 
    
    now = moment();
    let fileTS = now.format('HH_mm_ss^SSS');
    const downloadFile = `${this.downloadDir}/${this.dataReturn.returnFile}`
    const remoteFile = `${connSetup.username}@${connSetup.host}:~/${this.dataReturn.returnFile}`;
    
    const pk = `${this.privKeys}${this.authInfo.key}`;
    eventData.downloadStart = now.format('HH:mm:ss:SSS');
    
    const clown = require('child_process').exec
    // console.log(`Remote file: ${remoteFile}`);
    // console.log(`Download file: ${downloadFile}`);
    // console.log(this);
    const executor = clown(`scp -i ${pk} ${remoteFile} ${downloadFile}`);
    //const executor = clown('scp -i /home/hcdronedock/.ssh/hc_npp hcdronedock@hc-mongo:hc-server-report.hc .')
    
    executor.stderr.on('data', function(data) {
      console.log(data.toString());
    });
    
    executor.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    
    executor.stdout.on('end', function(data) {
        console.log("copied");
    });

    executor.on('error', (err)=>{console.log(err);})
    
    executor.on('close', function(code) {
        if (code !== 0) {
            console.log('Failed: ' + code);
        }
    });

    // await ssh.getFile(downloadFile, remoteFile).then((fileContents)=>{
    //   console.log(fileContents);
    // }).catch((err)=>{    
    //   console.log(err);  
    // });      
    now = moment();
    eventData.downloadEnd = now.format('HH:mm:ss:SSS');
    //console.log(eventData);

    // ssh.getFile('/home/steel/Lab/localPath', '/home/steel/Lab/remotePath').then(function(Contents) {
    //   console.log("The File's contents were successfully downloaded")
    // }, function(error) {
    //   console.log("Something's wrong")
    //   console.log(error)
    // })
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