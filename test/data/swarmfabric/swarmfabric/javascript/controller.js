const net = require('net');
//const network= require('./controller');
//const admin= require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/enrollAdmin');
//const UserEnroll1= require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/registerUser');
const UserEnroll2= require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/registerUser2');
const quer1 = require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/query');
const indquery = require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/indquery');
const createDevice = require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/invoke');
const transaction= require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/transaction')
const skillShare= require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/skillShare')
const onBlocAuthenticate = require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/onBlockAuthenticate')
const skillUpdate =  require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/skillUpdate')
const deposit =  require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/deposit')
const retreiveHistory = require('/home/swarm/Paras/test/fabric-samples/swarmfabric/javascript/retreiveHistory')
networkState = true
deployState=true


exports.registerUser = async function (data,Callback){
    var response = {}
    response.type= "registerUser"
    console.log("BLOCKCHAIN::CONTROLLER adminEnroll:  "+" start");
    try {
        console.log("Calling the function");
       // UserEnroll1.regUser1();
          console.log("Tag1");
          deployState =true;
      if (deployState){
             UserEnroll2.regUser(Callback,data.userName ,data.orgNo);
            console.log("User registered");        
        }
        else{
            response.state = "Chaincode not yet deployed "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER registerUser:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER registerUser:  "+" end");
}



exports.indquery = async function (data,Callback){

    console.log("BLOCKCHAIN::CONTROLLER query:  "+" start");
    try {


          console.log("Tag1");
      if (deployState){
        indquery.indquery(Callback,data.userName,data.orgNo);
        console.log("query done")

        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER individual query:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER individual query:  "+" end");
}



exports.query = async function (data,Callback){
 
    console.log("BLOCKCHAIN::CONTROLLER query:  "+" start");
    try {

       
          console.log("Tag1");
      if (deployState){
        quer1.query(Callback,data.userName,data.orgNo);
        console.log("query done")
                    
        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER query:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER query:  "+" end");
}


exports.invoke = async function (data,Callback){
    console.log("BLOCKCHAIN::CONTROLLER invoke:  "+" start");
    try {

      if (deployState){
	console.log("")
	console.log(JSON.stringify(data));
	
        createDevice.invoke(Callback,data.userName,data.orgNo,data.Model_param,data.Layers,data.language,data.Accuracy,data.organization,data.ID);
                 
        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER invoke:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER invoke:  "+" end");
}
 
exports.onBlockAuthenticate = async function (data,Callback){
	console.log("BLOCKCHAIN::VERIFICATION OF ONE TIME TRANSACTION:   "+"start");
try{
if (deployState){
	onBlockAuthenticate.onBlockAuthenticate(Callback,data.userNameRecv,data.userNameSendr);
	}
	else{
	response.state = "check"
	response.returnValue = false;
	Callback(response)}
}
 catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::Issue in Device Verification:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER verification done   "+" end");
}


exports.transaction = async function (data,Callback){
    console.log("BLOCKCHAIN::CONTROLLER Transaction:  "+" start");
	response= data;   
 try {

      if (deployState){
        await transaction.transaction(Callback,data.userNameRecv,data.orgNoRecv,data.userNameSendr,data.orgNoSendr);
	
        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER TRANSACTION:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER TRANSACTION:  "+" end");
}




exports.skillShare = async function (data,Callback){
    console.log("BLOCKCHAIN::CONTROLLER skillShare:  "+" start");
    try {

      if (deployState){
        skillShare.skillShare(Callback,data.userNameRecv,data.orgNoRecv,data.userNameSendr,data.orgNoSendr);

        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER skillShare:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER skillShare:  "+" end");
}

exports.skillUpdate = async function (data,Callback){
    console.log("BLOCKCHAIN::CONTROLLER skillUpdate:  "+" start");
    try {

      if (deployState){
        skillUpdate.skillUpdate(Callback,data.userName,data.orgNo,data.Model_param,data.Layers,data.current_skill,data.Accuracy);

        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER skillUpdate:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER skillUpdate:  "+" end");
}










exports.deposit = async function (data,Callback){
    console.log("BLOCKCHAIN::CONTROLLER skillUpdate:  "+" start");
    try {

      if (deployState){
        deposit.deposit(Callback,data.userName,data.orgNo,data.Amount);

        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER DEPOSIT:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER DEPOSIT:  "+" end");
}


exports.retreiveHistory = async function (data,Callback){

    console.log("BLOCKCHAIN::CONTROLLER query:  "+" start");
    try {


          console.log("Getting the transaction History\n\n");
      if (deployState){
        retreiveHistory.retreiveHistory(Callback,data.userName,data.orgNo);
        }
        else{
            response.state = "check "
            response.returnValue = false;
            Callback(response)
        }
        // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER RETREIVING HISTORY:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER HISTORY RETREIVED:  "+" end");
}

