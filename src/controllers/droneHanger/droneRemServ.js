const request = require('request');
const moment = require('moment');

//const auger = require('../dispatch/augur');
const auger = require('../dispatch/auger');
const DroneSSD = require('../droneHanger/droneSSD');

class DroneRemServ extends DroneSSD{
  constructor(remoteData){
    super(remoteData);
    this._eventData = {
        watchType: remoteData.droneType,
        id: this.id,
        err: false,
        shortMsg: "Success",
        dateTime: null,
      }
  }
  
  async makeRounds(){
    //console.log(`In ${this._droneType} Watch`);
    this.cycleTS_start = '01/01/1970';
    this.resetErrors();
    this.cycleCount = this.id;
    this.moduleRack.forEach(module=>{ 
      //console.log(module);     
      let moduleData = {...this._eventData};
      moduleData.id = module.id;
      let moduleDT = moment();
      moduleData.dateTime = moduleDT.format('YYYY-MM-DD HH:mm:ss');
      console.log("Initiating scan for module: " + module.name);
      module.initScan(moduleData, this);
    })
    
    while(this.moduleRack.length > this.watchReport.length){
      console.log("waiting for cycle to finish");
      await new Promise((resolve, reject)=>setTimeout(resolve, 500));
    }

    //console.log(this);
    this.cycleTS_stop = '04/01/1968';
    auger(this);

    // console.log("after await");
    // console.log(this.watchReport);
    // console.log("ERRORS");
    // console.log(this.errCount);
    // console.log(this.errors);
  }

}

module.exports = DroneRemServ;