import React, {Component} from 'react';

class Chatbar extends Component {
	userMessage = (evt)=>{
		evt.preventDefault()
		const taskValue = evt.target.value
		if (evt.key === 'Enter'){
		evt.target.value = '';
		this.props.addingMessage(taskValue);

	}
	


	}

	userName = (evt) => {
		evt.preventDefault()
		const taskValue = evt.target.value
		if (evt.key === 'Enter'){
		evt.target.value = '';
		this.props.newUser(taskValue)

	}
}




  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} onKeyUp={this.userName}/>
        <input onKeyUp={this.userMessage} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;