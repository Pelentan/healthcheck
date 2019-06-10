const UserMech = require('./userMech');

class UserController{
  constructor(){
    this._users = {};
  }

  loadUsers(groupId){
    const activeUsers = this.getActiveUsers(groupId);
    for(let id in activeUsers){
      this._users[id] = new UserMech(activeUsers[id]);
    }
    //console.log(users);
  }

  getActiveUsers(groupId){
    // Hacked until I get mongo set up.
    require('./userData');
    const activeUsers = userData;
    //console.log(activeUsers);
    return activeUsers;
  }

  alertGroup(parcel){
    this.loadUsers(parcel.messageGroup);
    Object.entries(this.users).forEach(([key,user])=>{
      user.sendAlert(parcel);
    })
  }

  get users(){return this._users;}

}

module.exports = UserController;
