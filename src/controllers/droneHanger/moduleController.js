require('../../db/mongoose');
const ModuleBase = require('../../models/modulesBase');

class ModuleController{
  constructor(){   
  }

  async buildModule(dataIn){ 
    const baseData = await this.loadData(dataIn.mod_id);
    this.moduleData = {...baseData,...dataIn};
    const Module = require('./moduleStore/'+this.moduleData.file);
    const module = new Module(this.moduleData);
    return module;
  }


  async loadData(id){
    const bdRet = await ModuleBase.findById(id).catch((err)=>{console.log(err)});
    const bd = bdRet.toObject();
    delete bd._id;
    delete bd.__v;
    return bd;
  }
}

module.exports = ModuleController;