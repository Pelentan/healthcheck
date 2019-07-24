
require('./db/mongoose');
//const User = require('./models/users');
const Group = require('./models/groups');
const DroneModel = require('./models/droneModel');
const Module = require('./models/modulesBase');
const Drone = require('./models/drones');

//require('./controllers/droneHanger/droneData');
const crit = {
  name: 'JsonPlaceholderApi'
}
Drone.getDroneBy(crit).then((drone)=>{
  console.log(drone);
})



// for(let key in droneData){
//   console.log(droneData[key].name);
//   let drone = new Drone(droneData[key]);
//   drone.save().then((ret)=>{
//     console.log(ret);
//   }).catch(doip=>{
//     console.log(doip);
//   })
// }


// Drone.getGroupNames().then((groups)=>{
//   console.log(groups);
// });


// Drone.find({active:true}).then((dronezez)=>{
//   console.log(dronezez[0].moduleKit);
// }).catch((dogo)=>{
//   console.log(dogo);
// });

// const newDrone = new Drone();

// newDrone.save().then((gotit)=>{
//   console.log(gotit);
// }).catch((youiks)=>{
//   console.log(youiks);
// })



// const newModule = new Module({
//   name: 'Simple Is Page Up',
//   description: 'Just verifies that the host responds.',
//   file: 'serverConnectCheck',
//   requestType: "get",
//   timeout: 10000,
//   statusGood: 200,
//   returnType: 'none',
// })

// newModule.save().then((gotit)=>{
//   console.log(gotit);
// }).catch((zozo)=>{
//   console.log(zozo);
// });




// const model = new DroneModel({
//   name: 'Remote Server',
//   description: 'Drone designed to access servers.  This can be done with http, json, or ssh/scp.',
//   fileName: 'droneRemServ.js',
// });

// model.save().then((gotit)=>{
//   console.log(gotit);
// }).catch((oops)=>{
//   console.log(oops);
// });

// const id = "5d0bd94ed4e5190110e87593";
// Group.findById(id).then((gotch)=>{
//   console.log(gotch);
// })



// const nGroup = {  
//   name: "Alpha",
//   users: ["5d30bd4a96cb4900596b6628","5d30bdb1e36f2900735050f3"], 
// }

// const group = new Group(nGroup);
// group.save().then((bactatch)=>{
//   console.log(bactatch);
// }).catch((err)=>{
//   console.log("opsi" + err);
// });

// const tUser = {
//   name: "Randy",
//   accessLevel: -1,
//   active: true,
//   email: "rtobias@mylendpro.com",
//   password: "chamgora",
//   phone: "5553032605",
//   textProvider: "vtext.com",
//   schedules: [1,2],
// };


// const user = new User(tUser);
// // const testU = new User(tUser);
// // const notit = ['password', 'tokens']
// // console.log(testU.toJsonFull());
// // console.log(testU.toJsonClean(notit));


// user.save().then((yoiks)=>{
//   console.log(yoiks);
// }).catch(err =>{
//   console.log("oopsy");
//   //console.log(err.errors);
//   const keys = Object.keys(err.errors);
//   console.log(keys);
//   const valObj = err.errors;

//   const valMessages = [];
//   keys.forEach((key)=>{
//     valMessages.push(valObj[key].message);
//   })
//   console.log(valMessages);
// })
// console.log(user)

// const email = User.find({email:"mshaffer@mylendpro.com"}, (err, person)=>{
//   if(err){return "oopsy"}
//   console.log(person);
// });