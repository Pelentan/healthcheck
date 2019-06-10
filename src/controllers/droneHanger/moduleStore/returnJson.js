const request = require('request');
const moment = require('moment');

const ModuleSSD = require('./moduleSSD');

class ReturnJason extends ModuleSSD{
  constructor(moduleData){
    super(moduleData);
  }

  initScan(eventData, drone){
    const reqSetup = {
      url: this.url,
      method: this.requestType? this.requestType : "GET",
      timeout: this.timeout,
      form: this.dataPost,
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
      }
    }
    eventData.request = reqSetup;
    //console.log(reqSetup);
    request(reqSetup, (error, response)=>{
      const now = moment();
      eventData.dateTime = now.format('YYYY-MM-DD HH:mm:ss.SSS')
      if(error){
        eventData.err = true;
        eventData.errorData = error;
        eventData.shortMsg = 'Unable to make connection';
        
      } else if (response.statusCode !== this.statusGood){
        eventData.err = true
        eventData.respCode = response.statusCode
        eventData.shortMsg = `Expected status code ${this.statusGood} Received code: ${response.statusCode}`;
      } else {
        if(!this.dataCheck(response)){
          eventData.err = true;
          eventData.shortMsg = `Unable to find testing data in the body of the response`;
          eventData.errorList = this.errors;
        }
      }
      eventData.respCode = response.statusCode;
      eventData.response = response;
      if(eventData.err){
        drone.errors = eventData;
      }
      drone.watchReport = eventData;
    });
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