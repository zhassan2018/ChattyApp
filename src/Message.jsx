import React, {Component} from 'react';

class Message extends Component {

  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.id}</span>
        <span className="message-content">{this.props.inside}</span>
      </div>
    
    );
  }
}
export default Message;