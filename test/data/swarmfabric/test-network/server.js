var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);


const controller = require('./controller');
const { networkInterfaces } = require('os');

var port  = 3000
//console.log("Server adderess = "+networkInterfaces()['eth0'][1]["address"]+":"+port)

console.log("starting the server ");

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var ions = io.of('/blockchain');
ions.on('connection', function(socket){
    console.log('Connected to blockchain namespace, client : '+socket.client["id"]);

    function Callback(data){

        socket.emit(data.type,data);

    }
    
   

    socket.on('shareSkill',function(data){
        // response = controller.shareSkill(data)
        // socket.emit('shareSkill',JSON.stringify(response));
    });


    socket.on('registerUser',function(data){
        console.log("Got message registerUser "+JSON.stringify(data));
         controller.registerUser(data,Callback)
        // socket.emit('register',JSON.stringify(response));
    });

    socket.on('query',function(data){
         controller.query(data,Callback)
        // socket.emit('query',JSON.stringify(response));
    });

socket.on('invoke',function(data){
    controller.invoke(data,Callback)
   // socket.emit('query',JSON.stringify(response));
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
