
const moment = require('moment');

// const SiteController = require('../sites/siteController');
// const ApiController = require('../apis/apiController');
const DroneController = require('../droneHanger/droneController');
const timekeeper = require('./timekeeper');

const now = moment();
const logNow = now.format('YYYY-MM-DD HH:mm:ss');


class dispatchController{
  constructor(){
    this.actionGroups = {};
    this.buildActionGroups();
  }

  buildActionGroups(){
    this.actionGroups.WatchDrones = new DroneController('watch');
    //console.log(this.watchGroups);
  }

  initiateWatch(){
    for(let group in this.actionGroups){
      if(!this.actionGroups[group].active)continue;
      if(group === "WatchDrones"){
        console.log("Initiate Drone Watch");
        const action = "makeRounds";
        this.actionGroups[group].standWatch();
      }
    }
  }
}

module.exports = dispatchController

