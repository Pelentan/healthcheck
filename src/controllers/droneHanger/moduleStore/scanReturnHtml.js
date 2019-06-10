const request = require('request');
const moment = require('moment');

const ModuleSSD = require('./moduleSSD');

class ScanReturnHtml extends ModuleSSD{
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
        'Content-Type': 'application/x-www-form-urlencoded',
        ...this.headers,
      }
    }
    eventData.request = reqSetup;
    //console.log(reqSetup);
    request(reqSetup, (error, response)=>{
      const now = moment();
      eventData.dateTime = now.format('YYYY-MM-DD HH:mm:ss')
      if(error){
        eventData.err = true;
        eventData.errorData = error;
        eventData.shortMsg = 'Unable to make connection';
        
      } else if (response.statusCode !== this.statusGood){
        eventData.err = true
        eventData.respCode = response.statusCode
        eventData.shortMsg = `Expected status code ${this.statusGood} Received code: ${response.statusCode}`;
      } else {
        const waldo = new RegExp(this.bodyScrape,"i");
        //console.log(this);
        if(this.bodyScrape != "" && response.body.search(waldo) === -1){
          //console.log(response.body);
          eventData.err = true;
          eventData.shortMsg = `Unable to find {${this.bodyScrape}} in the body of the response`;
        }
        eventData.respCode = response.statusCode;
        eventData.response = response;
        if(eventData.err){
          // console.log("GOTS AN ERROR")
          // console.log(eventData);
          drone.errors = eventData;
        }
      }
      drone.watchReport = eventData;
    });
  }
  
}

module.exports = ScanReturnHtml;