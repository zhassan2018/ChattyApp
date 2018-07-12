import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, 
      messages: [], 
      users:{userNum: 0}
    }

    this.socket = new WebSocket('ws://localhost:3001');
  }


  componentDidMount() {
 
    this.socket.onmessage =  (event) => {
      console.log(event.data);
      const incomingMessage = JSON.parse(event.data);
      switch(incomingMessage.type){
      case 'incomingMessage':  
      this.updateMessage(incomingMessage)
      break;
      case 'incomingNotification':
      this.updateUser(incomingMessage)
      break;
      case 'connection':
      console.log('get here')
      this.setState( {users: {userNum: incomingMessage.count}} );
      break;

    }
    }

    
         

         }

  updateMessage = (incomingMessage)    => {
    console.log(this.state.messages, 'got here')
      this.setState({  messages: [
        ...this.state.messages,
      { 
        type: incomingMessage.type,
        id: incomingMessage.id,
        username: incomingMessage.username,
        content: incomingMessage.content
      }
      
    ]

      })

  }

  updateUser = (incomingMessage)    => {
    console.log(this.state.messages, 'fdgfgf')
      this.setState({  messages: [
        ...this.state.messages,
      { 
        type: incomingMessage.type,
        id: incomingMessage.id,
        username: '',
        content: incomingMessage.content
      }
      
    ]

      })

  }



  newUser = (newUser) =>{
    let userChange = {
      type: "postNotification", content: this.state.currentUser.name + "changed their name to  " + newUser 
    }
    this.setState({currentUser: {name : newUser}})
    const ws = this.socket 
    this.socket.send(JSON.stringify(userChange))

   
  }    

  addingMessage = (message) => {
    //Do the setState stuff in here
    //this.setState({
    

     let messages = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: message  
      }
      const ws = this.socket 
      this.socket.send(JSON.stringify(messages))
     
    
    }

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className='nav-users'>Users online: {this.state.users.userNum}</span>
      </nav>
      <MessageList messages = {this.state.messages}/>
      <Chatbar addingMessage={this.addingMessage} newUser={this.newUser} name = {this.state.currentUser.name}/>
      </div>

    );
  }
}
export default App;
