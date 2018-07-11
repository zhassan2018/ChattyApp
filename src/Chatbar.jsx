import React, {Component} from 'react';

class Chatbar extends Component {
	userMessage = (evt)=>{
		evt.preventDefault()
		const taskValue = evt.target.value
		if (evt.key === 'Enter'){
		this.props.addingMessage.onopen(taskValue)
	}
	}
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} />
        <input onKeyUp={this.userMessage} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;