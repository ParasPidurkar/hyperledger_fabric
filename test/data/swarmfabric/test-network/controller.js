const net = require('net');
//const network= require('./controller');
//const admin= require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/enrollAdmin');
//const UserEnroll1= require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/registerUser');
const UserEnroll2= require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/registerUser2');
const quer1 = require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/query');
//const quer2 = require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/query2');
const createDevice = require('/home/swarm/Paras/App/net/backup/realbackup/fabric-samples/fabcar/javascript/invoke');
networkState = true
deployState=true
/*
//networkUp scenario
exports.networkUp = async function (data,Callback){
    var response = {}
    response.type= "networkUp"
    console.log("BLOCKCHAIN::CONTROLLER networkUp:  "+" start");
    try {
      if (!networkState){
        const { exec } = require('child_process');
        
            var yourscript = exec('./network.sh up createChannel -ca -s couchdb ',    (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                    response.returnValue = false;
                    response.error = error
                }
                else{
                    networkState=true;
                    response.returnValue = true;
                }
            Callback(response)
            })
        }
        else{
            response.state = "network already running"
            response.returnValue = true;
            Callback(response)
        }
        // response.returnValue = true;
    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER networkUp:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER networkUp:  "+" end");
    //await networkUp();
    //return response;
}
//deployment of the chaincode 
exports.DeployCC = async function (data,Callback){
    var response = {}
    response.type= "DeployCC"
    console.log("BLOCKCHAIN::CONTROLLER DeployCC:  "+" start");
    try {
      if (!deployState){
        const { exec } = require('child_process');
        
            var yourscript = exec('./network.sh deployCC -ccn fabcar -ccv 1 -cci initLedger -ccl javascript -ccp /home/swarm/Paras/App/net/backup/realbackup/fabric-samples/chaincode/fabcar/javascript ',    (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                    response.returnValue = false;
                    response.error = error
                }
                else{
                    deployState=true;
                    response.returnValue = true;
                }
            Callback(response)
            })
        }
        else{
            response.state = "chaincode  already deployed"
            response.returnValue = true;
            Callback(response)
        }
        // response.returnValue = true;
    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER DeployCC:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER DeployCC:  "+" end");
}




exports.NetworkCC = async function (data){
    var response = {}
    console.log("BLOCKCHAIN::CONTROLLER NetworkCC:  "+" start");
    try {
      
        const { exec } = require('child_process');
        
            var yourscript = exec('./../fabcar/startFabric.sh',    (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
            console.log(`exec error: ${error}`);
            }
            })
        response.returnValue = true;
    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        console.log("BLOCKCHAIN::CONTROLLER NetworkCC:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER NetworkCC:  "+" end");
    await NetworkCC();
    return response;
}



exports.adminEnroll = async function (data,Callback){
    var response = {}
    response.type= "adminEnroll"
    console.log("BLOCKCHAIN::CONTROLLER adminEnroll:  "+" start");
    try {

        if (deployState){
                        admin.adminEnroll(Callback);

            }
            else{
                response.state = "chaincode not yet deployed  "
                response.returnValue = true;
                Callback(response)
            }
            // response.returnValue = true;

    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        Callback(response)
        console.log("BLOCKCHAIN::CONTROLLER adminEnroll:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER adminEnroll:  "+" end");
}


*/


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
             UserEnroll2.regUser(Callback,data.userName ,data.org);
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
        console.log("BLOCKCHAIN::CONTROLLER reisterUser:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER registerUser:  "+" end");
}



exports.query = async function (data,Callback){
 
    console.log("BLOCKCHAIN::CONTROLLER query:  "+" start");
    try {

       
          console.log("Tag1");
      if (deployState){
        quer1.query();
                    
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
        createDevice.invoke();
                 
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








/*

exports.register = function (data){
    var response = {}
    console.log("BLOCKCHAIN::CONTROLLER register:  "+" start");
    try {

        response.returnValue = true;
    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        console.log("BLOCKCHAIN::CONTROLLER register:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER register:  "+" end");

    return response;
}


exports.query = function (data){
    var response = {}
    console.log("BLOCKCHAIN::CONTROLLER query:  "+" start => data = "+JSON.stringify(data));
    try {
    
        response.returnValue = true;
    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        console.log("BLOCKCHAIN::CONTROLLER query:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER query:  "+" end");

    return response;
}

*/

exports.shareSkill = function (data){
    var response = {}
    console.log("BLOCKCHAIN::CONTROLLER shareSkill:  "+" start => data = "+JSON.stringify(data));
    try {
    
        response.returnValue = true;
    }
    catch(err) {
        response.returnValue = false;
        response.error = err.message;
        console.log("BLOCKCHAIN::CONTROLLER shareSkill:  "+" error = "+ err.message);
    }
    console.log("BLOCKCHAIN::CONTROLLER shareSkill:  "+" end");

    return response;
}