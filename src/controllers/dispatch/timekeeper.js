const moment = require('moment');

async function timekeeper(data){  
  const now = moment();
  let start = now.format('YYYY-MM-DD HH:mm:ss');
  let count = 0;
  
  switch(data.cycleType){
    case "continuous":
      //console.log(`In ${data.name} timekeeper: continuous`)
      count = 0;
      while(data.drone.continue){
        count++;
        //console.log(`${data.name} has ${x} togas`);
        data.drone.cycleCount = count;
        await cycle(data);
      }
      break;
    case "count":
     // console.log(`In ${data.name} timekeeper: count for ${data.drone.cycle}`)
      count = 0;
      while(data.drone.continue && count < data.drone.cycle){
        count++;        
        data.drone.cycleCount = count;
        await cycle(data);
        
        // console.log(data.drone.continue);
        // console.log(data.drone.cycle);
        // console.log(count);
      }
    default:
      break;
  }
  //console.log(`count: ${count}`);
  return count;
}

async function cycle(data){
  const interval = data.drone.checkInterval * 1000;
  await data.drone[data.action]();
  await new Promise((resolve, reject)=>setTimeout(resolve, interval));
  return;
}

module.exports = timekeeper
