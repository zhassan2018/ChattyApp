import React, {Component} from 'react';

class Message extends Component {

  render() {
  
    switch(this.props.type)	{
      case 'incomingMessage':	
        return(
          <div className="message">
            <span className="message-username">{this.props.username}</span>
            <span className="message-content">{this.props.inside}</span>
          </div>
          )
        break;
        
      case 'incomingNotification':
        return(
        	<div className="notification">
        	  <span className="notification-content">{this.props.inside}</span>
        	</div>
        
        	)
        break;
    }     
  }
}
export default Message;