import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {

    const Messages = this.props.messages.map(message => {
        return <Message key={message.id} type={message.type} username = {message.username} inside ={message.content} />
       });
    return (
      <main className="messages">
         
           {Messages}
         
       </main>
     
    );
  }
}
export default MessageList;