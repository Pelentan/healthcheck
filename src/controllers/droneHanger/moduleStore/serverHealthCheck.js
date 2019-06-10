const fs = require('fs');
const path = require('path');
const Client = require('ssh2').Client;
const moment = require('moment');

const ModuleSSD = require('./moduleSSD');

class ReturnJason extends ModuleSSD{
  constructor(moduleData){
    super(moduleData);
  }

  initScan(eventData, drone){
    const conSetup = {
      host:  this.url,
      port: 22,
      readyTimeout: this.timeout,
      username: this.authInfo.user,
      privatekey: this.authInfo.key,
    }
    eventData.request = conSetup;
    //console.log(reqSetup);
    const conn = new Client();
    conn.on('ready', ()=>{
      console.log('Client :: ready');
      conn.exec('uptime', function(err, stream) {
        if (err) throw err;
        stream.on('close', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', function(data) {
          console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
        });
      });
      conn.end;
      const connTime = moment();
      eventData.dateTime = now.format('YYYY-MM-DD HH:mm:ss.SSS')
    })
    .on('error',()=>{  
      eventData.err = true;
      eventData.errors.push(error);
    }).connect({conSetup});    
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

module.exports = ReturnJason;