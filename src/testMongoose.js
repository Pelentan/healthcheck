
 require('./db/mongoose');
// const User = require('./models/users');
// const Group = require('./models/groups');
// const DroneModel = require('./models/droneModel');
// const Module = require('./models/modulesBase');
const Drone = require('./models/drones');

Drone.getGroupNames().then((groups)=>{
  console.log(groups);
});


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
//   name: 'Server Health Check',
//   description: '',
//   file: 'serverHealthCheck',
//   requestType: "ssh",
//   timeout: 10000,
//   statusGood: 200,
//   returnType: 'json',
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

// const tUser = {
//   name: "Michael",
//   accessLevel: -1,
//   email: "mshaffer@mylendpro.com",
//   phone: "4123032605",
//   textProvider: "vtext.com",
//   schedules: [1,2],
// };

// const nGroup = {  
//   name: "Alpha",
//   users: ["5d0a9fc3a7cc9c00a554edd3","5d0bd4937271f800dfd00e40"], 
// }

// const group = new Group(nGroup);
// group.save().then((bactatch)=>{
//   console.log(bactatch);
// }).catch((err)=>{
//   console.log("opsi" + err);
// });