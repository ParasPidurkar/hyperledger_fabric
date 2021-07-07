exports.networkUp = function (){
    const { exec } = require('child_process');
    //var yourscript = exec('sh /home/swarm/Paras/demo/fabric/fabric-samples/fabcar/startFabric.sh',
    var yourscript = exec('sh init.sh',
    (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
    console.log(`exec error: ${error}`);
    }
    });
    }




    exports.networkUp = function (){
    console.log("Inside Network");
    const { exec } = require('child_process');
    //home/swarm/Paras/demo/fabric/fabric-samples
    console.log("check the path");
   // var yourscript = exec(sh '/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/startFabric.sh',(error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
    console.log(`exec error: ${error}`);
    }
    })
    }


/*exports.networkUp = function (){
    console.log("Inside Network");
    const { exec } = require('child_process');
    //home/swarm/Paras/demo/fabric/fabric-samples
    console.log("check the path");
    var yourscript = exec(sh '/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/startFabric.sh',    (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
    console.log(`exec error: ${error}`);
    }
    })
    }
    //var yourscript = exec('/home/swarm/Paras/App/net/fabric-samples/test-network/network.sh up',    (error, stdout, stderr) => {    
    // networkDown()
exports.networkDown=function(){
    const { exec } = require('child_process');

    var yourscript = exec('./network.sh down',    (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
    console.log(`exec error: ${error}`);
    }
    })
    
    }
    
    exports.networkUpChannel =function(){
        const { exec } = require('child_process');
    
        var yourscript = exec('./network.sh up createChannel ',    (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
        console.log(`exec error: ${error}`);
        }
        })
        
        }

            //creating the channel with the certification authority
        exports.networkUpChannel_ca =function(){
            const { exec } = require('child_process');
        
            var yourscript = exec('./network.sh up createChannel -ca ',    (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
            console.log(`exec error: ${error}`);
            }
            })
            
            }



                //creating the channel with the certification authority
        exports.networkUpChannel_cac =function(){
            const { exec } = require('child_process');
        
            var yourscript = exec('./network.sh up createChannel -ca -s couchdb ',    (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
            console.log(`exec error: ${error}`);
            }
            })
            
            }


*/