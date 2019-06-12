
const ssh2_streams = require('ssh2-streams');
const parse = ssh2_streams.utils.parseKey;

class SCP{
  constructor(bd){    
    this.host = bd.host;
    this.port = bd.port;
    this.readyTimeout = bd.timeout;
    this.username = bd.user;
    this.password = bd.password;
    this.privateKey = bd.privateKey;
    this.passphrase = bd.passphrase;
    this.remoteFile = bd.remoteFile;
    this.localFile = bd.localFile;
  }

  buildScpCommand(fileData){
    let scpStr = `scp `;
    if(this.privateKey){
      scpStr += `-i ${this.privateKey} `;
      //privateKey = parseKey(this.config.privateKey, cfg.passphrase);
    } else {
      // Not sure how to build this yet.  Would require working with streams it seams.
    }
    scpStr += `${this.username}@${this.host}:$`;
  }

  pullFile(){

  }

  pushFile(){
    
  }

}
module.exports = SCP;