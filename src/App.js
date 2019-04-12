import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChatRoom from "./components/ChatRoom";
//import * as firebase from "firebase";

class App extends Component {
  render() {
    return (
      <div className="App">
        This is the REACT App!
        <ChatRoom />
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById("app")); not sure if needed
export default App;
