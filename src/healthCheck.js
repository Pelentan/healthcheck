const DispatchController = require('./controllers/dispatch/dispatchControler')


// const Drone = require('./controllers/droneHanger/droneRemServ');
// require('./controllers/droneHanger/droneData');
// const testDrone = new Drone(remoteData[51]);
// //console.log(testDrone);
// testDrone.makeRounds();

const dispatchController = new DispatchController().initiateWatch()

// var Client = require('ssh2').Client;
 
// var conn = new Client();
// conn.on('ready', function() {
//   console.log('Client :: ready');
//   conn.exec('uptime', function(err, stream) {
//     if (err) throw err;
//     stream.on('close', function(code, signal) {
//       console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//       conn.end();
//     }).on('data', function(data) {
//       console.log('STDOUT: ' + data);
//     }).stderr.on('data', function(data) {
//       console.log('STDERR: ' + data);
//     });
//   });
// }).connect({
//   host: '192.168.100.100',
//   port: 22,
//   username: 'frylock',
//   privateKey: require('fs').readFileSync('/here/is/my/key')
// });