var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const { networkInterfaces } = require('os');

const controller = require('./controller');

var port  = 3000
//console.log("Server adderess = "+networkInterfaces()['Wi-Fi'][1]["address"]+":"+port)

console.log("starting the server ");

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var ions = io.of('/blockchain');
ions.on('connection', function(socket){
    console.log('Connected to blockchain namespace, client : '+socket.client["id"]);

    function Callback(data){
		console.log("CALLBACK:: "+JSON.stringify(data));
		if(data.type == "transaction"){
			if(data.returnValue){
				ions.to(data.userNameSendr).emit('shareSkillRequest', {request: data});
			}
		}
        socket.emit(data.type,data);

    }

    socket.on('shareSkill',function(data){
        console.log("Got the skillShare "+JSON.stringify(data));
        controller.skillShare(data,Callback)
        // socket.emit('shareSkill',JSON.stringify(response));
            });


    socket.on('registerUser',function(data){
        console.log("Got message registerUser "+JSON.stringify(data));
        console.log("BLOCKCHAIN ::SERVER :: REGISTERUSER")
        socket.join(data.userName);
        controller.registerUser(data,Callback)
        // socket.emit('register',JSON.stringify(response));
    });



   socket.on('test',function(data){
        console.log("ON TEST ::"+JSON.stringify(data));
        ions.to("beta").emit('test', {msg: 'hello world. swarmnode1'});
        //ions.to("swarmnode2").emit('test', {msg: 'hello world. swarmnode2'});
        });
/*
   socket.on('shareSkillRequest',function(data){
        console.log("Requesting for the skillshare")
        ions.to(data.userNa).emit('test', {msg: 'hello world. swarmnode1'});

        });

  socket.on('shareSkillResponse',function(data){
        console.log("Skillshare request received")
        });


 socket.on('shareSkillRequest',function(data){
        console.log("Requesting for the skillshare Request"+JSON.stringify(data))
        ions.to(data.userNameSendr).emit('shareSkillRequest', {request: data});
                ions.to(data.userNameRecv).emit('shareSkillRequest', {callback: 'Share skill request sent to '+data.userNameSendr});

        });
*/

 socket.on('shareSkillResponse',function(data){
        console.log("Skillshare request received Response"+JSON.stringify(data));
                ions.to(data.userNameRecv).emit('shareSkillResponse', {callback: data});
        });

    socket.on('query',function(data){
        console.log("Calling for query")
         console.log("BLOCKCHAIN ::SERVER :: Query "+JSON.stringify(data));

         controller.query(data,Callback)
        // socket.emit('query',JSON.stringify(response));
    });

        socket.on('invoke',function(data){
         console.log("BLOCKCHAIN ::SERVER :: INVOKE "+JSON.stringify(data));

        console.log("Calling for invoke");
         controller.invoke(data,Callback);
   // socket.emit('query',JSON.stringify(response));
        });


 socket.on('indquery',function(data){
        console.log("Calling for query " +JSON.stringify(data));
         console.log("BLOCKCHAIN ::SERVER :: Query");
         controller.indquery(data,Callback)
        // socket.emit('query',JSON.stringify(response));
    });



        socket.on('transaction',function(data){
		console.log("BLOCKCHAIN ::SERVER :: TRANSACTION " +JSON.stringify(data));
        console.log("Calling the transaction function\n\n")
        controller.transaction(data,Callback)
        });

        socket.on('skillShare',function(data){
         console.log("BLOCKCHAIN ::SERVER :: SKILLSHARE " +JSON.stringify(data));

        console.log("Calling the Skillshare \n\n");
        controller.skillShare(data,Callback)
        });
        socket.on('onBlockAuthenticate',function(data){
			console.log("BLOCKCHAIN ::SERVER :: onBlockAuthenticate " +JSON.stringify(data));
        //controller.onBlockAuthenticate(data,Callback)
        data.returnValue= false;
        data.type="onBlockAuthenticate"
        Callback(data);
        });

        socket.on('skillUpdate',function(data){
		console.log("BLOCKCHAIN ::SERVER :: SKILLUPDATE " +JSON.stringify(data));
        controller.skillUpdate(data,Callback)
        });

	socket.on('deposit',function(data){
	console.log('BLOCKCHAIN::SERVER ::PAYMENT '+JSON.stringify(data));
	controller.deposit(data,Callback)
	});


        socket.on('retreiveHistory',function(data){
        console.log('BLOCKCHAIN::SERVER ::Getting History '+JSON.stringify(data));
        controller.retreiveHistory(data,Callback)
        });




});


io.on('connection', function(socket) {
    console.log('Connection established without namespace');
    socket.on('test', function(data) {
        console.log('A client sent us this message:', data.message);
        socket.emit('test', { message: 'A new user has joined!' });
    });
});




server.listen(port);

