var express = require('express')
var app = express()
const { exec } = require('child_process');
var readline = require('readline');
app.use(express.json());
var process = require("process");
var net = require('net');

var RL = readline.createInterface(process.stdin, process.stdout);


var server = net.createServer(function(socket) {
	//socket.write('Echo server\r\n');
    socket.pipe(socket);
    socket.on('data',function(data){
        var bread = socket.bytesRead;
        var bwrite = socket.bytesWritten;
       // console.log(bwrite);
        console.log(data.toString());
        //echo data
        var is_kernel_buffer_full = socket.write('Data ::' + data);

        RL.question('Enter Windows 10 command :', (command)=>{
            console.log(command);
            socket.write(command);
        });
      
      });

      socket.on('error',function(error){
        console.log('Error : ' + error);
      });
      

});

server.listen(1337, '127.0.0.1');
