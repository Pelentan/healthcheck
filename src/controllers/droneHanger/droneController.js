require('./droneData');
require('../../db/mongoose');
const timekeeper = require('../dispatch/timekeeper');
const DroneModel = require('../../models/drones');

class DroneController{
  constructor(droneType){
    if(droneType === '')return false;
    this._active = false;
    this._droneCarrier = {};
    this.buildDroneCarrier(droneType);
    this._deployed = false;
  }

  static getGroupNames(){
    const groups = DroneModel.getGroupNames();
    return groups;
  }

  async buildDroneCarrier(droneType){
    droneData = await DroneController._getDroneData(droneType);
    let droneBase = '';
    let Drone = undefined;
    for(let key in droneData){
      if(droneData[key].droneType != droneType || !droneData[key].droneBase){continue;}
      if(droneBase === '' || droneBase !== droneData[key].droneBase){
        droneBase = droneData[key].droneBase;
        Drone = require('./' + droneBase);
      }
      this._droneCarrier[key] = new Drone(droneData[key]);
      // console.log("drones");
      // console.log(this._droneCarrier[key]);
      if(this._droneCarrier[key].active)this._active = true;
    }
  }

  async standWatch(){  
    this.deployed = true;
    const action = 'makeRounds';  
    for(let id in this.droneCarrier){
      let drone = this.droneCarrier[id];
      let data = {
        id: id,
        name: drone.name,
        action,
        drone,
        cycleType: drone.cycleType,
      };
      //console.log(data);
      timekeeper(data);
    }
  }

  static async _getDroneData(droneType){
    const droneData =  await DroneModel.getDronesByType(droneType).catch((err)=>{console.log(err)});
    //console.log(droneData);
    return droneData;
  }

  static async getDroneBy(criteriaIn){
    const criteria = {};
    for(let key in criteriaIn){
      criteria[key] = new RegExp(`${criteriaIn[key]}`,'i')
    }
    const drone = await DroneModel.getDroneBy(criteria).catch((err)=>{console.log(err)});
    return drone;
  }

  static getGroupNames(){
    const groups = DroneModel.getGroupNames();
    return groups;
  }


  get active(){return this._active;}
  get droneCarrier(){return this._droneCarrier;}
  get deployed(){return this._depoloyed;}
  set deployed(dep){
    this._deployed = dep;
    return this._deployed;
  }
}

module.exports = DroneController;