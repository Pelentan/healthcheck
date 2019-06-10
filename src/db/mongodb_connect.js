const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://root:tango@ca-mongo', (err, client)=>{
    if (err){
        return console.log(`Can't get to it ${err}`);
    }
    console.log("Made it");
    const db = client.db('ToDoApp');
   
    
    db.collection('Todos').insertOne({
        text: "Firing of the Crucible",
        completed: true
    }, (err, result) => {
        if(err){
            return console.log("Couldn't add", err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
} );