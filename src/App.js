import React from "react";
import "./App.css";
import Header from "./components/header";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <body></body>
      </div>
    );
  }
}

export default App;
