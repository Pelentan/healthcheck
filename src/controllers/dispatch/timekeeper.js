const moment = require('moment');

async function timekeeper(data){  
  const now = moment();
  let start = now.format('YYYY-MM-DD HH:mm:ss');
  
  switch(data.cycleType){
    case "continuous":
      //console.log(`In ${data.name} timekeeper: continuous`)
      let x = 0;
      while(data.drone.continue){
        x++;
        //console.log(`${data.name} has ${x} togas`);
        data.drone.cycleCount = x;
        await cycle(data);
      }
      break;
    case "count":
     // console.log(`In ${data.name} timekeeper: count for ${data.drone.cycle}`)
      let count = 0;
      while(data.drone.continue && count < data.drone.cycle){
        count++;        
        //console.log(`${data.name} has ${count} togas`);
        data.drone.cycleCount = count;
        await cycle(data);
      }
    default:
      break;
  }
}

async function cycle(data){
  const interval = data.drone.checkInterval * 1000;
  await data.drone[data.action]();
  await new Promise((resolve, reject)=>setTimeout(resolve, interval));
}

module.exports = timekeeper
