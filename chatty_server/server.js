// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let updateClientCount = () => {
  let cnxObj = {};
  cnxObj.type = "connection";
  cnxObj['count'] = wss.clients.size;
  cnxObj.id = uuidv4();
  
 return cnxObj;
};
console.log(updateClientCount())

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  	let message1 = JSON.parse(message)
  	switch(message1.type){
  		case "postMessage":
  		message1['id'] = uuidv4();
  		message1['type'] = 'incomingMessage';
  		wss.clients.forEach(function each(client) {
  		   
  		    	var toSend = JSON.stringify(message1)
  		      client.send(toSend);
  		    
  		  });
  		break;

  		case "postNotification":
  		message1['type'] = 'incomingNotification';
  		message1['id'] = uuidv4()
  		wss.clients.forEach(function each(client) {
  		   
  		    	var toSend = JSON.stringify(message1)
  		      client.send(toSend);
  		    
  		  });
  		break;

  	}


   
  });

  wss.clients.forEach(function each(client) {
    var countFunction = updateClientCount();
    var updateCount = JSON.stringify(countFunction);

     client.send(updateCount);
     
    });

   ws.on('close', () => {
    wss.clients.forEach(function each(client) {
      var countFunction = updateClientCount();
      var updateCount = JSON.stringify(countFunction);

       client.send(updateCount);
       
      });

  
      
    });
    



 
});