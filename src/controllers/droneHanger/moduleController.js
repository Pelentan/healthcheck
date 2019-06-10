const moduleController =(dataIn)=>{
  baseData = loadData(dataIn.id);
  moduleData = {...baseData,...dataIn};
  //console.log(moduleData);
  const Module = require('./moduleStore/'+moduleData.file);
  const module = new Module(moduleData);
  return module;
}


require('./baseModuleData');
const loadData =(id)=>{
  //console.log(baseModuleData);
  return baseModuleData[id];
}

module.exports = moduleController;