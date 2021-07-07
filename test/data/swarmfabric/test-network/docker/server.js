const net = require('net');
//const network= require('./controller');
const admin= require('/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/javascript/enrollAdmin2');
const UserEnroll1= require('/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/javascript/registerUser');
const UserEnroll2= require('/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/javascript/registerUser2');
const quer1 = require('/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/javascript/query');
const quer2 = require('/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/javascript/query2');
const createDevice = require('/home/swarm/Paras/demo/fabric/fabric-samples/fabcar/javascript/invoke');

// Create a server object
const server = net.createServer((socket) => {
socket.on('data', (data) => {
console.log("DATA :: "+data.toString());
data = JSON.parse(data);
console.log(JSON.stringify(data));
if(data.hasOwnProperty("type")) {
console.log("TYPE :: " + data["type"]);

    

       if(data["type"]=="adminEnroll")
    {
        //console.log("Hi");
        admin.adminEnroll();
    }
     sleep(5000);

        if(data["type"]=="registerUser1")
    {
        UserEnroll1.regUser1();
    }
    sleep(10000);
    if(data["type"]=="registerUser2")
    {
        UserEnroll2.regUser2();

    }
    sleep(5000);
    if(data["type"]=="query")
    {
        quer1.query();

    }
    sleep(2000);
    if(data["type"]=="query2")
    {
          quer2.query2();

    }
    sleep(2000);
    if(data["type"]=="invoke")
    {
        createDevice.invoke();
    }


/*
    
      if(data["type"]=="networkDown")
    {
      network.networkDown();
    }
    if(data["type"]=="networkUpChannel")
    {
        network.networkUpchannel();
    }

    if(data["type"]=="networkUpChannel_ca")
    {
        network.networkUpChannel_ca();
    }


    if(data["type"]=="networkUpChannel_cac")
    {
        network.networkUpChannel_cac();
    }
*/






}
});
socket.write('SERVER: Hello! This is server speaking.');
socket.end('SERVER: Closing connection now.');
}).on('error', (err) => {
console.error(err);
});
// Open server on port 9899
server.listen(9899, "192.168.1.3",() => {
console.log('opened server on', server.address());


});


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
