
const moment = require('moment');

const DroneController = require('../droneHanger/droneController');
const Drone = require('../../models/drones');

class dispatchController{
  constructor(){
    this._dispatchables = false;
    this.carrierGroups = {};
    this.buildCarrierGroups();
  }

  async buildCarrierGroups(){
    this.activeGroups = await DroneController.getGroupNames();
    //console.log("Active groups: " + this.activeGroups);
    const actLen = this.activeGroups.length;
    let group = '';
    for (let x = 0; x < actLen; x++){ 
      group = this.activeGroups[x]
      this.carrierGroups[group] = new DroneController(group);
    }
    this._dispatchables = true;
    //console.log(this.carrierGroups);
  }

  async initiateWatch(){
    while(!this.dispatchables){      
      console.log("Waiting for carrier groups to build");
      await new Promise((resolve, reject)=>setTimeout(resolve, 500));
    }
    //console.log("CarrierGroups");
    //console.log(this.carrierGroups);
    for(let group in this.carrierGroups){
      if(!this.carrierGroups[group].active || this.carrierGroups[group].deployed)continue;
      if(group === "watch"){
        console.log("Initiate Drone Watch");
        this.carrierGroups[group].standWatch();
      }
    }
    return true;
  }

  get dispatchables(){return this._dispatchables}
  set dispatchables(idmat){
    this._dispatchables = !this._dispatchables;
    return this._dispatchables;
  }
}

module.exports = dispatchController

