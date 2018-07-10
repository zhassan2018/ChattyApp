import React, {Component} from 'react';

class Chatbar extends Component {
	userMessage = (evt)=>{
		evt.preventDefault()
		console.log(evt.target.value)
		const taskValue = evt.target.value
		console.log(evt.key)
		if (evt.key === 'Enter'){
		this.props.addingMessage(taskValue)
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