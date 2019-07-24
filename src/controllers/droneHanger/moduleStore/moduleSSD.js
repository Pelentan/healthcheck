
class ModuleSSD{
  constructor(moduleData){
    //const moduleBaseData = this.retrieve(moduleData.id);       
    this._privKeys = process.env.PRIVKEYS;
    this._downloadDir = process.env.DOWNLOADDIR;
    this._uploadDir = process.env.UPLOADDIR;

    this._id = moduleData.id;
    this._authInfo = moduleData.authInfo ? moduleData.authInfo : {user:"",pass:"",key:""};
    this._authTrigger = moduleData.authTrigger ? moduleData.authTrigger : false;
    this._bodyScrape = moduleData.bodyScrape;
    this._dataPost = moduleData.dataPost;
    this._dataReturn = moduleData.dataReturn;
    this._errCount = 0; 
    this._errors = [];    
    this._headers = moduleData.headers;
    this._name = moduleData.name;
    this._port = moduleData.port;
    this._requestType = moduleData.requestType;
    this._returnType = moduleData.returnType;
    this._statusGood = moduleData.statusGood ? moduleData.statusGood : 200;  
    this._timeout = moduleData.timeout ? moduleData.timeout : 10000;
    this._url = moduleData.url;
  }


  retrieve(id){
    // Not sure if I need this yet so just returning junk for now.
    const data = {
      toge: "blue",
    }

    return data;
  }  
  
  /**
   * This takes in a js object and an object that has a set of things to search for.
   * The search tree must match the layout of the object being searched.  If you just 
   * want to search for a key to make sure it exists, give the entery and empty ('') value.
   */
  traverseTree(jObject, searchCrit){
    let go = false;
    for(let key in searchCrit){
      if(jObject[key]){
        if(typeof(searchCrit[key]) == "object"){
          this.traverseTree(jObject[key], searchCrit[key]);
        } else {
          if(searchCrit[key] !== "" && searchCrit[key] !== jObject[key]){
            this.errors = (`Value [${key}] :: {${searchCrit[key]}} not found.`)
          }
        }
      } else {
          this.errors = (`Key [${key}] not found.`)
      }
    }
    if(this.errors.length === 0) go = true;
    return go;
  }

  /**
   * This takes an object with the following key:values
   * - command:  The command being run.  Most often "bash".
   * - script:  The name of the script being run by the "command".  All scripts must be in 'scripts/' folder.
   * - arguments:  An array of arguments to be added after the script.
   * - exitCode:  If set to true, 
   * @param {*} buildData 
   */
  buildCommand(buildData){
    let commandStr = "";
    try{
      const commandArr = [];
      commandArr.push(buildData.command);
      commandArr.push(`scripts/${buildData.script}`);
      for(let i=0; i < buildData.arguments.length; i++ ){
        commandArr.push(buildData.arguments[i]);
      }
      commandStr = commandArr.join(' ');
    } catch(e){
      commandStr = ""
    }
    return commandStr;
  }

  /**
   * Getter, setters and resetters
   */  
  get authInfo(){return this._authInfo;}
  set authInfo(auth){
    this._authInfo = auth;
    return this._authInfo;
  }
  get authTrigger(){return this._authTrigger;}
  set authTrigger(idmat){
    this._authTrigger = !this._authTrigger;
    return this._authTrigger;
  }
  get bodyScrape(){return this._bodyScrape;}
  get dataPost(){return this._dataPost;}
  get dataReturn(){return this._dataReturn;}
  get downloadDir(){return this._downloadDir;}
  get errCount(){return this._errCount;}; 
  get errors(){return this._errors;}
  set errors(err){
    this._errors.push(err);
    return this._errors;
  }
  resetErrors(){
    this._errors = [];
  }
  get headers(){return this._headers;}
  get id(){return this._id;};  
  get name(){return this._name;};
  get port(){return this._port;}
  get privKeys(){return this._privKeys;}
  get statusGood(){return this._statusGood;};   
  get returnType(){return this._returnType;}
  get requestType(){return this._requestType;}
  get timeout(){return this._timeout;}
  set timeout(timeout){
    this._timeout = timeout;
    return this._timeout;
  }
  get uploadDir(){return this._uploadDir;}
  get url(){return this._url;};
}

module.exports = ModuleSSD;