const socket = require('socket.io-client')('http://10.221.40.228:3000/blockchain', {
            reconnection: true,
            reconnectionDelay: 10000
          });

        socket.on('registerUser',function(data) {
        console.log("\n\n\nUser has been registered   REGISTERED USER")
	console.log('Setting the parameters for users INVOCATION');
        socket.emit('invoke',{userName:'alpha',orgNo:'1',Model_param:'300',Layers:'2',language:'Hindi',Accuracy:'65',organization:'LGE',ID:'alpha'})
	console.log("The parameters has been set INVOCATION DONE");
        console.log('registered the user\n  '+JSON.stringify(data));
        });
	console.log("Registering two Users")
        socket.emit('registerUser',{userName:'alpha',orgNo:"1"})
	console.log("First device registered");

	socket.on('query',function(data){
                if(data.returnValue){
                    console.log("\n\n\ncalling the query function")
                    //socket.emit('invoke',{message:'enrolling the admin'})
                    console.log("Emit the invoke function")
                    console.log("query called")

                }
            console.log('query done'+JSON.stringify(data));
        });


        socket.on('invoke',function(data){
                if(data.returnValue){
		   console.log("\n\n\nQuery for the devices")
                  // socket.emit('query',{userName:'swarmnode1', org:'org1'})
		    console.log("Going for the  transaction ");
		  //socket.emit("test",{}); 
		 socket.emit('transaction',{userNameRecv:'alpha',orgNoRecv:'1',userNameSendr:'beta',orgNoSendr:'2'});
                }
            console.log('invocation done  '+JSON.stringify(data));
        });
	socket.on("test",function(data){
	console.log("my test function "+JSON.stringify(data));

	});


	 socket.on('test',function(data){
        console.log("on test :: "+JSON.stringify(data));
        ions.to("alpha").emit('test', {msg: 'hello world. swarmnode1'});
        ions.to("beta").emit('test', {msg: 'hello world. swarmnode2'});
    	});



	socket.on('transaction',function(data){
	//if(data.returnValue){
	console.log("\n\n\n\nTransaction is done ");
        socket.emit('skillShare',{userNameRecv:'alpha',orgNoRecv:'1',userNameSendr:'beta',orgNoSendr:'2'});
	//socket.emit('query',{userName:'alpha',orgNo:'1'});

	//		}
		console.log('transaction done'+JSON.stringify(data));
	});


	socket.on('skillShare',function (data){
	if(data.returnValue){
	//socket.emit('query',{userName:'alpha',orgNo:'1'})
	console.log('Skill has been shared ');
	socket.emit('retreiveHistory',{userName:'alpha',orgNo:'1'});

	}
	//socket.emit('skillUpdate',{userName:'alpha',orgNo:'1',Model_param:'2000',Layers:'3',current_skill:'Mandarin',Accuracy:'95'})
	console.log('skill has been shared '+JSON.stringify(data));
	});

	socket.on('skillUpdate',function(data){
	console.log('\n\n\nSkill Updated')
	//socket.emit('query',{userName:'alpha',orgNo:'1'});
	socket.emit('retreiveHistory',{userName:'alpha',orgNo:'1'});
	});

	socket.on('retreiveHistory',function(data){
        console.log('\n\n\nTransaction History received ')
	console.log('Received History is as follows:'+JSON.stringify(data));
        //socket.emit('query',{userName:'alpha',orgNo:'1'});

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
