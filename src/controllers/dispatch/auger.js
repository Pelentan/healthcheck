const moment = require('moment')

const UserController = require('../users/userController');

const augur = (drone) =>{
  //console.log(drone.droneType);
  switch(drone.droneType){
    case "watch":
      roundReport(drone);
      break;
    default:
      break;
  }
}

const roundReport = (drone) => {
  if(drone.errors.length){
    invokeErrProt(drone);       
  }else{
    invokeSuccessProt(drone);
    }
}

const invokeErrProt =(remoteDrone)=>{
  remoteDrone.incErrCount(); 
  console.log("errorsy count: " + remoteDrone.errCount + " == " + remoteDrone.errThreshold);
  //console.log(remoteDrone);
  if(remoteDrone.errCount === remoteDrone.errThreshold){
    remoteDrone.triggerErrState();
    const parcel = {
      epTemplate: 1,
      epName: remoteDrone.name,
      epId: remoteDrone.id,
      epShortMessage: remoteDrone.errors.shortMsg,
      epTarget: remoteDrone.uri,
      messageGroup: remoteDrone.alertGroup,
      errorCount: remoteDrone.errCount,
      errorReport: JSON.stringify(remoteDrone.errors),
      response: ""//data,
    };
    invokeCalls(parcel);
    //console.log(parcel);
  }
}

const invokeSuccessProt = (drone) =>{
  console.log(`${drone.cycleTS_start} - ${drone.cycleTS_stop}` + " ==> " + drone.name + " -- " + drone.cycleSuccessMsg);
  if(drone.errStatus){
    drone.clearErrState();
    const parcel = {
      epTemplate: 2,
      epName: drone.name,
      epId: drone.id,
      epShortMessage: drone.cycleSuccessMsg,
      epTarget: drone.uri,
      messageGroup: drone.alertGroup,
      response: ""//data,
    }
  }
  
}

const invokeCalls = (parcel) =>{  
  parcel.from = 'mylepard@gmail.com';
  switch(parcel.epTemplate){
    case 1:
      parcel.subject = `${parcel.epName} : ${parcel.epId} in error state`;
      parcel.emailBody = `${parcel.epName} : ${parcel.epId} in error state.  When connecting to ${parcel.epTarget} 
          Watcher encountered a fail state.  \n\nError Report: \n${parcel.errorReport} 
          \n\nFull Response if received: \n${parcel.response}`;
      parcel.textBody = `${parcel.epName} : ${parcel.epId} in error state.  When connecting to ${parcel.epTarget} 
      Watcher encountered a fail state.`;
      break;
    case 2:
        parcel.subject = `${parcel.epName} : ${parcel.epId} Cleared faults.`;
        parcel.emailBody = `${parcel.epName} : ${parcel.epId} is no longer in error status.  When connecting 
            to ${parcel.epTarget} Watcher determined ${parcel.epShortMessage}
            \n\nFull Response if received: \n${parcel.response}`;
        parcel.textBody = `${parcel.epName} : ${parcel.epId} Cleared faults.  When connecting to ${parcel.epTarget} 
        Watcher determined ${parcel.epShortMessage}.`;
      break;
  }

  // console.log("Email Body");
  // console.log(parcel.emailBody);
  const users = new UserController();
  users.alertGroup(parcel);
  // for(let key in alertUsers){
  //   let uId = alertUsers  [key];
  //   // console.log(uId);
  //   // console.log(users);
  //   //users[uId].sendAlert(parcel);
  // }  
};

module.exports = augur;