import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      currentUser: {name: "Anonymous"}, 
      messages: [], 
      users:{userNum: 0}
    }
    this.socket = new WebSocket('ws://localhost:3001');
  }


  componentDidMount() {
 
    this.socket.onmessage =  (event) => {
     
      const incomingMessage = JSON.parse(event.data);

      switch(incomingMessage.type){

        case 'incomingMessage':  
          this.updateMessages(incomingMessage)
          break;

        case 'incomingNotification':
          this.updateUsers(incomingMessage)
          break;

        case 'connection':
          this.setState( {users: {userNum: incomingMessage.count}} );
          break;

        default:
          throw new Error("Unknown event type " + incomingMessage.type);
      }
    }  
  }
 

  updateMessages = (incomingMessage) => {

    this.setState({ messages: [
      ...this.state.messages,
      { 
        type: incomingMessage.type,
        id: incomingMessage.id,
        username: incomingMessage.username,
        content: incomingMessage.content
      } ]
    })
  }


  updateUsers = (incomingMessage) => {

    this.setState({  messages: [
      ...this.state.messages,
      { 
        type: incomingMessage.type,
        id: incomingMessage.id,
        username: '',
        content: incomingMessage.content
      } ]
    })
  }


  addUser = (newUser) => {

    if (newUser === ''){
      newUser = "Anonymous";
    }

    let userChange = {
      type: "postNotification", content: `${this.state.currentUser.name} changed their name to ${newUser}` 
    }

    this.setState({currentUser: {name : newUser}});

    this.socket.send(JSON.stringify(userChange)); 
  }    

  addMessage = (message) => {

    let messages = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: message  
    }
     
    this.socket.send(JSON.stringify(messages))
        
  }

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='nav-users'>Online Users: {this.state.users.userNum}</span>
      </nav>
      <MessageList messages = {this.state.messages}/>
      <Chatbar addingMessage={this.addMessage} newUser={this.addUser} name = {this.state.currentUser.name}/>
      </div>

    );
  }
}
export default App;
