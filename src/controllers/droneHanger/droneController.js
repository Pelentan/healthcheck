require('./droneData');
const timekeeper = require('../dispatch/timekeeper');

class DroneController{
  constructor(droneType){
    this._active = false;
    this._droneDock = {};
    this.buildDroneDock(droneType);
  }

  buildDroneDock(droneType){
    let droneBase = '';
    let Drone = undefined;
    for(let key in droneData){
      if(droneData[key].droneType != droneType){continue;}
      // Temporary until db is set up
      droneData[key].droneBase = 'droneRemServ';
      if(droneBase === '' || droneBase !== droneData[key].droneBase){
        droneBase = droneData[key].droneBase;
        Drone = require('./' + droneBase);
      }
      this._droneDock[key] = new Drone(droneData[key]);
      if(this._droneDock[key].active)this._active = true;
      // console.log(droneDock[key]);
    }
  }

  async standWatch(){  
    const action = 'makeRounds';  
    for(let id in this.droneDock){
      let drone = this.droneDock[id];
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

  get active(){return this._active;}
  get droneDock(){return this._droneDock;}
}

module.exports = DroneController;