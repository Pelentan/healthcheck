const moment = require('moment')

const ModuleController = require('./moduleController');

class DroneSSD{
  constructor(droneData){
    //console.log(droneData);
    if(!(droneData.id)){
      return false
    }    
    this._id = droneData.id;
    this._active = droneData.active===true ? droneData.active : false;
    this._alertGroup = droneData.alertGroup;
    this._alertSchedule = droneData.alertSchedule;
    this._alertSent = {email: false, text: false};
    this._checkInterval = this.prepCheckInterval(droneData.checkInterval); // In seconds   
    this._checkeInterval_on_fail = this.prepCheckInterval(droneData.checkInterval_on_fail); 
    this._checkInterval_hold = this.prepCheckInterval(droneData.checkInterval);
    this._continue = droneData.continue ? droneData.continue : false;
    this._cycleType = droneData.cycleType;
    this._cycle = droneData.cycle ? droneData.cycle : 10;
    this._cycleCount = droneData.cycleCount;
    this._cycleTS_start = '';
    this._cycleTS_stop = '';
    this._cycleSuccessMsg = droneData.cycleSuccessMsg ? droneData.cycleSuccessMsg : 'All tests passed';
    this._droneType = droneData.droneType;
    this._errThreshold = droneData.errThreshold ?droneData.errThreshold : 1;
    this._errCount = 0;
    this._errStatus = false;
    this._errors = [];
    this._moduleRack = [];
    this._name = droneData.name;
    this._port = droneData.port ? droneData.port : 80;
    this._startDT = this.now.format('YYYY-MM-DD HH:mm:ss');
    this._timeout = droneData.timeout ? droneData.timeout : 10000;
    this._type = droneData.type;
    this._watchReport = [];
    this._uri = droneData.uri;
    
    this.rackModules(droneData.moduleKit);
  }

  prepCheckInterval(val){
    val = parseInt(val);
    if(val < 3) val = 3;
    return val ? val : 30;
  };

  incErrCount(){
    this._errCount++;
    return this._errCount;
  };
  resetErrCount(){
    this._errCount = 0;
    return this._errCount;
  };

  triggerErrState(){
    this._errStatus = true;
    this._checkInterval = this._checkeInterval_on_fail;
  }

  clearErrState(){
    this._errStatus = false;
    this.resetErrCount();
    this.checkInterval = this._checkInterval;
  } 
  
  /**
   * 
   * @param {*} moduleList 
   */
  rackModules(moduleList){
    const moduleController = new ModuleController();
    moduleList.forEach(async moduleData => {
      moduleData.url = this.uri + moduleData.url;
      module = await moduleController.buildModule(moduleData);
      // console.log("module returned");
      // console.log(module);
      this._moduleRack.push(module);      
    });
  }
  
  /**
   * Getters and setters.  Oh, and resetters.
   */
  get errors(){return this._errors;}
  set errors(err){
    this._errors.push(err);
    return this._errors;
  }
  resetErrors(){
    this._errors = [];
    this._watchReport = [];
  }
  get name(){return this._name;};
  get id(){return this._id;};
  get type(){return this._type;}
  get uri(){return this._uri}
  get active(){return this._active;}
  set active(idmat){
    this._active = !this._active;
    return this._active;
  }
  get checkInterval(){return this._checkInterval;};
  set checkInterval(val){
    this._checkInterval = this.prepCheckInterval(val);
    return this._checkInterval;
  };
  get checkInterval_on_fail(){return this._checkeInterval_on_fail};
  set checkInterval_on_fail(val){
    this._checkeInterval_on_fail = this.prepCheckInterval(val);
    return this._checkeInterval_on_fail;
  }
  get continue(){return this._continue;};
  get cycle(){return this._cycle;};
  set cycle(int){
    this._cycle = int;
    return this._cycle;
  }
  get cycleCount(){return this._cycleCount;}
  set cycleCount(idmat){
    const mua = idmat * 74;
    this._cycleCount++;
    return this._cycleCount;
  }
  get cycleType(){return this._cycleType;}
  get errThreshold(){return this._errThreshold;};
  get errCount(){return this._errCount;};
  get errStatus(){return this._errStatus;};
  get startDT(){return this._startDT;};
  set startDT(dt){
    this._startDT = dt;
    return this._startDT;
  };
  get alertGroup(){return this._alertGroup;}
  set alertGroup(id){
    this._alertGroup = id;
    return this._alertGroup;
  }
  get alertSchedule(){return this._alertSchedule;}
  set alertSchedule(id){
    this._alertSchedule = id;
    return this._alertSchedule;
  }
  get checkInterval_hold(){return this._checkInterval_hold;}
  get now(){
    return moment();
  }
  get watchReport(){return this._watchReport;}
  set watchReport(data){
    this._watchReport.push(data);
    return this._watc_watchReporthData;
  }
  get moduleRack(){return this._moduleRack;}
  get droneType(){return this._droneType;}
  get cycleSuccessMsg(){return this._cycleSuccessMsg;}
  set cycleSuccessMsg(msg){
    this._cycleSuccessMsg = msg;
    return this._cycleSuccessMsg;
  }
  get cycleTS_start(){return this._cycleTS_start;}
  set cycleTS_start(time){    
    let start = moment();
    this._cycleTS_start = start.format('YYYY-MM-DD HH:mm:ss.SSS');
    return this._cycleTS_start;
  }
  get cycleTS_stop(){return this._cycleTS_stop;}
  set cycleTS_stop(time){    
    let stop = moment();
    this._cycleTS_stop = stop.format('YYYY-MM-DD HH:mm:ss.SSS');
    return this._cycleTS_stop;
  }
}

module.exports = DroneSSD;

