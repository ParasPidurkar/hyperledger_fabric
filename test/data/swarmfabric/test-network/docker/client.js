const net = require('net');
const client = net.createConnection({ host:"192.168.1.3", port: 9899 }, () => {
console.log('sending data');

//data = {"type":'adminEnroll'};
//client.write(JSON.stringify(data));
/*
data ={"type":'registerUser2'};
client.write(JSON.stringify(data));
*/
sleep(5000);
//data ={"type":'registerUser1'};
//client.write(JSON.stringify(data));
data ={"type":'query'};
client.write(JSON.stringify(data));

//data ={"type":'invoke'};
//client.write(JSON.stringify(data));


});
client.on('data', (data) => {
console.log("data :: "+data.toString());
client.end();
});
client.on('end', () => {
console.log('CLIENT: I disconnected from the server.');
});


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   