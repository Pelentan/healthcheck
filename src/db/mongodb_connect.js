const {MongoClient, ObjectID} = require('mongodb');

const connectionUrl = 'mongodb://root:tango@hc-mongo';
const dbName = 'health-check';

const id = new ObjectID();
console.log(id);

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client)=>{
    if (err){
        return console.log(`Can't get to it ${err}`);
    }
    console.log("Made it");
    const db = client.db(dbName);
   

    
    // db.collection('Todos').insertOne({
    //     text: "Firing of the Crucible",
    //     completed: true
    // }, (err, result) => {
    //     if(err){
    //         return console.log("Couldn't add", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
} );