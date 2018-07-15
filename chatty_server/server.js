const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });


let updateClientCount = () => {
  //function which determines number of client online
  let connectObj = {};
  connectObj.type = "connection";
  connectObj['count'] = wss.clients.size;
  connectObj.id = uuidv4();
  
  return connectObj;
};


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //Determines type of message from client and send back message to all clients
  	let parsedMessage = JSON.parse(message);
  	switch(parsedMessage.type){
  		case "postMessage":
    		parsedMessage['id'] = uuidv4();
    		parsedMessage['type'] = 'incomingMessage';

    		wss.clients.forEach(function each(client) {   		   
		    	let backToClient = JSON.stringify(parsedMessage);
		      client.send(backToClient);    
  		  });
  		  break;

  		case "postNotification":
    		parsedMessage['type'] = 'incomingNotification';
    		parsedMessage['id'] = uuidv4();

    		wss.clients.forEach(function each(client) { 
		    	let backToClient = JSON.stringify(parsedMessage);
		      client.send(backToClient);
  		  });
  		  break;
  	}
  });

  //Gives number of users
  wss.clients.forEach(function each(client) {
    let updateUserCount = updateClientCount();
    let stringUpdateUserCount = JSON.stringify(updateUserCount);

    client.send(stringUpdateUserCount);

  });

   ws.on('close', () => {
    //Updates number of users when a client leaves
    wss.clients.forEach(function each(client) {
     let updateUserCount = updateClientCount();
     let stringUpdateUserCount = JSON.stringify(updateUserCount);

     client.send(stringUpdateUserCount);
       
    });

  });
 });