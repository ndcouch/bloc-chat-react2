import React, { Component } from "react";
import * as fb from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDMaAbq5tL7DaISsaDcnNcpNdqHS6LYFZs",
  authDomain: "bloc-chat-react2-cbe3a.firebaseapp.com",
  databaseURL: "https://bloc-chat-react2-cbe3a.firebaseio.com",
  projectId: "bloc-chat-react2-cbe3a",
  storageBucket: "bloc-chat-react2-cbe3a.appspot.com",
  messagingSenderId: "385433353176"
};
const firebase = fb.initializeApp(config);

class ChatRoom extends Component {
  constructor(props, context) {
    super(props, context);
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.state = {
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("messages/")
      .on("value", snapshot => {
        //child_added?
        const currentMessages = snapshot.val();

        if (currentMessages != null) {
          this.setState({
            messages: currentMessages
          });
        }
      });
  }

  updateMessage(event) {
    console.log("updateMessage:" + event.target.value);
    this.setState({
      message: event.target.value
    });
  }

  submitMessage(event) {
    console.log("submitMessage: " + this.state.message);
    const nextMessage = {
      id: this.state.messages.lengty,
      text: this.state.message
    };

    firebase
      .database()
      .ref("messages/" + nextMessage.id)
      .set(nextMessage);

    /*var list = Object.assign([], this.state.messages);
    list.push(nextMessage);
    this.setState({
      messages: list
    });*/
  }

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return <li key={message.id}>{message.text}</li>;
    });
    return (
      <div>
        <ol>{currentMessage}</ol>
        <input
          onChange={this.updateMessage}
          type="text"
          placeholder="Message"
        />
        <br />
        <button onClick={this.submitMessage}>Submit Message</button>
      </div>
    );
  }
}

export default ChatRoom;
