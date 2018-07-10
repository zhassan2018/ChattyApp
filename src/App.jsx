import React, {Component} from 'react';
import Chatbar from './Chatbar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {

  constructor(props){
  super(props);
  this.state = {
  currentUser: {name: "Bob"}, 
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 1,
   
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 2,
     
    }
  ]
}
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }


  addingMessage = (message) =>{
    //Do the setState stuff in here
    this.setState({
      messages:[
      {
        username: this.state.currentUser.name,
        content: message,
        id: this.state.messages.length + 1,
      
      },
      ...this.state.messages

      ]
    })


  }


  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages = {this.state.messages}/>
      <Chatbar addingMessage={this.addingMessage} name = {this.state.currentUser.name}/>
      </div>

    );
  }
}
export default App;
