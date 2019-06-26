
const fs = require('fs');
const ssh2_streams = require('ssh2-streams');
const parse = ssh2_streams.utils.parseKey;

class SCP{
  constructor(scpData){    
    this.host = scpData.host;
    this.port = scpData.port;
    this.readyTimeout = scpData.readyTimeout;
    this.username = scpData.username;
    this.password = scpData.password;
    this.privateKey = scpData.privateKey;
    this.passphrase = scpData.passphrase;
    this.remoteFile = scpData.remoteFile;
    this.localFile = scpData.localFile;
    this.scpStr = "";
    this.lastResult = {};

    this._buildScpCommand();
  }

  _buildScpCommand(){
    this.scpStr = `scp `;
    if(this.readyTimeout && this.readyTimeout>0){
      this.scpStr += `-o ConnectTimeout=${this.readyTimeout} `;
    }
    if(this.port){
      this.scpStr += `-P ${this.port} `;
    }
    if(this.privateKey){
      this.scpStr += `-i ${this.privateKey} `;
    } else {
      // Not sure how to build this yet.  Would require working with streams it seams.
      //privateKey = parseKey(this.config.privateKey, cfg.passphrase);
    }
  }

  async pullFile(){    
    this.scpStr += `${this.username}@${this.host}:${this.remoteFile} ${this.localFile}`;
    if(fs.existsSync(this.localFile)){
      fs.chmodSync(this.localFile, '0700');
    }    
    return await this._executeTransfer();
  }

  async pushFile(){
    this.scpStr += `${this.localFile} ${this.username}@${this.host}:${this.remoteFile}`;
    return await this._executeTransfer();
  }

  async _executeTransfer(){
    let holding = true;
    const result = {};
    const exec = require('child_process').exec
    exec(this.scpStr, (err, stdout, stderr)=>{
      finishTransfer(err, stdout, stderr);
    });

    const finishTransfer = (err, stdout, stderr) => {
      result.err = err;
      result.stdout = stdout;
      result.stderr = stderr;
      this.lastResult = result;
      holding = false;
    }

    while(holding){
      console.log("Awaiting file transfer.");
      await new Promise((resolve, reject)=>setTimeout(resolve, 100));
    }
    return result;
  }

  resetProperties(scpData){
    for (let key in scpData){
      this[key] = scpData[key];
    }
    this._buildScpCommand();
  }

}
module.exports = SCP;