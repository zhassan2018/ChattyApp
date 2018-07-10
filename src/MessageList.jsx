import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {

    const Messages = this.props.messages.map(message => (
         <Message key={message.id} id = {message.username} inside ={message.content} />
       ));
    return (
      <main className="messages">
         <div className="message system">
           <ul>{Messages}</ul>
         </div>
       </main>
     
    );
  }
}
export default MessageList;