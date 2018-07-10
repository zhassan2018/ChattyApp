import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input class="chatbar-username" placeholder="Your Name (Optional)" />
        <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default Chatbar;