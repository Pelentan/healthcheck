
const moment = require('moment');

const DroneController = require('../droneHanger/droneController');
const Drone = require('../../models/drones');

class dispatchController{
  constructor(){
    this.carrierGroups = {};
    this.buildCarrierGroups();
  }

  async buildCarrierGroups(){
    this.activeGroups = await DroneController.getGroupNames();
    console.log("Active groups: " + this.activeGroups);
    const actLen = this.activeGroups.length;
    let group = '';
    for (let x = 0; x < actLen; x++){ 
      group = this.activeGroups[x]
      this.carrierGroups[group] = new DroneController(group);
    }
    //console.log(this.carrierGroups);
  }

  initiateWatch(){
    for(let group in this.carrierGroups){
      if(!this.carrierGroups[group].active || this.carrierGroups[group].deployed)continue;
      if(group === "WatchDrones"){
        console.log("Initiate Drone Watch");
        this.carrierGroups[group].standWatch();
      }
    }
    return true;
  }
}

module.exports = dispatchController

