
const socket = require('socket.io-client')('http://10.221.40.228:3000/blockchain', {
            reconnection: true,
            reconnectionDelay: 10000
          });

        socket.on('registerUser',function(data) {
        console.log("\n\n\nUser has been registered   REGISTERED USER")
        console.log('Setting the parameters for users INVOCATION');
	socket.emit('invoke',{userName:'beta',orgNo:'2',Model_param:'300',Layers:'2',language:'korean',Accuracy:'89',organization:'LGSOFT',ID:'beta'})
        console.log("The parameters has been set INVOCATION DONE");
        console.log('registered the user\n  '+JSON.stringify(data));
        });
        console.log("Registering two Users")
        socket.emit('registerUser',{userName:'beta',orgNo:'2'})
	 console.log("swarm node 2 registered")

        socket.on('indquery',function(data){
                if(data.returnValue){
                    console.log("\n\n\ncalling the query function")
                    //socket.emit('invoke',{message:'enrolling the admin'})
                    console.log("Emit the invoke function")
                    console.log("query called")

                }
            console.log('query done'+JSON.stringify(data));
        });

	socket.on('retreiveHistory',function(data){
	console.log('RETREIVE HISTORY'+JSON.stringify(data));
	});


        socket.on('invoke',function(data){
                if(data.returnValue){
                   console.log("\n\n\nQuery for the device")
                 //  socket.emit('indquery',{userName:'beta', orgNo:'2'})
//		   socket.emit('retreiveHistory',{userName:'beta',orgNo:'2'})

                    console.log("Going for the  transaction ");
                  console.log("CALLING THE TEST FUNCTION :: INVOKE\n\n") 
		   socket.emit("test", {});
		socket.emit('skillUpdate',{userName:'beta',orgNo:'2',Model_param:'2000',Layers:'3',current_skill:'Mandarin',Accuracy:'95'});
//		socket.emit('retreiveHistory',{userName:'beta',orgNo:'2'})

		 //socket.emit('onBlockAuthentication',{userNameRecv:'swarmnode1',userNameSendr:'swarmnode2'});
                }
            console.log('invocation done  '+JSON.stringify(data));
        });


socket.on("test", function (data) {
  console.log("my test function " + JSON.stringify(data));
});


	socket.on('onBlockAuthenticate',function(data){
	console.log("\n\n\nAuthentication of the device ")
	socket.emit('transaction',{userNameRecv:'swarmnode1',userNmaeSendr:'swarmnode2'})
	});

        socket.on('transaction',function(data){
        console.log("\n\n\n\nTransaction is done ");
        socket.emit('indquery',{userName:'swarmnode1',org:'org1'})
        console.log('Tag');
	 socket.emit('retreiveHistory',{userName:'beta',orgNo:'2'})

                console.log('transaction done'+JSON.stringify(data));
        });
        socket.on('skillShare',function (data){
        if(data.returnValue){
        //socket.emit('query',{userName:'swarmnode1',org:'org1'})
        console.log('Skill has been shared ');
        }
        console.log('skill has been shared '+JSON.stringify(data));
        });

	socket.on('skillUpdate',function(data){
	console.log("Updating the code");
	// socket.emit('retreiveHistory',{userName:'beta',orgNo:'2'})

	});


        //either 'io server disconnect' or 'io client disconnect'
        socket.on('disconnect', (reason) => {
 console.log("client disconnected");
            if (reason === 'io server disconnect') {
              // the disconnection was initiated by the server, you need to reconnect manually
              console.log("server disconnected the client, trying to reconnect");
              socket.connect();
            }else{
                console.log("trying to reconnect again with server");
            }
            // else the socket will automatically try to reconnect
          });

        socket.on('error', (error) => {
            console.log(error);
        });

