import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      // utilising hash map object to store key-value pairs. key ==> user, value ==> user's notes.
      currentUsers: [],
    };
  }

  // at first instance, when browser loads + after user tried logging in.
  componentDidMount() {
    // retrieve "users" with getItem from json data
    let currentUserData = localStorage.getItem("users");

    // check if user already exists in local storage
    if (currentUserData) {
      currentUserData = JSON.parse(currentUserData);
      this.setState({
        currentUsers: currentUserData,
      });
    }
  }

  // pass in "event" as a parameter to represent the event triggered by the input element
  handleInputChange = (event) => {
    console.log(`login input : ${event}`);
    // "events.target" refers to the element that triggered the event (aka the input element) ==> {name, value}
    // use destructuring assignment to extract the "name"(key) and "value" properties from "event.target"
    // the name property represents the name attribute of the input element, the value property represents the current value of the input
    let { name, value } = event.target;
    this.setState({
      [name]: value,
      // instead of specifying the key directly (e.g., username, password) we can use bracket notation '[name]' if (1) the key is not known beforehand or (2) we want to reuse this handleInputChange for various "inputs" (e.g. username & password).
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    // create a hash map to store username & password (key) & their value
    let user = {
      username: username,
      password: password,
    };

    // add new users into the current users' array
    let newUser = [...this.state.currentUsers, user];

    // add new users into local storage using setter method
    localStorage.setItem("users", JSON.stringify(newUser));
    alert(`Hello! Welcome, ${username}!`);

    this.setState({
      username: "",
      password: "",
      currentUsers: newUser,
    });
    this.props.handlePageChange("home");
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div className="login-page">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <button
              className="login-back-button"
              onClick={() => this.props.goBackLandingPage()}
            >
              back to previous page
            </button>
            <h1 className="login-title">Log in to notes</h1>
            <label>
              Username:
              <input
                type="text"
                value={username}
                name="username"
                placeholder="username"
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>

            <label>
              Password:
              <input
                type="text"
                value={password}
                name="password"
                placeholder="password"
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>

            <button type="submit">log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

//form - flexbox

// landing page --> login page
// ask for username & password (Form)
// pass the information from here to App.js (parent) to render out the user's notes stored within the local storage.
