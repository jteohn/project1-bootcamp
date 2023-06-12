import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  // pass in "event" as a parameter to represent the event triggered by the input element (username & password input fields)
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

    // retrieve the stored user list from local storage. Use "allUser" across all components.
    const storedUserList = JSON.parse(localStorage.getItem("allUsers")) || [];

    // check if the user input username & password match any data from our local storage
    const user = storedUserList.find(
      (user) => user.username === username && user.password === password
    );

    // if user already exists in local storage
    if (user) {
      // use setter method to store any new notes from said user to the user's local storage
      localStorage.setItem("currentUser", JSON.stringify(user));

      this.setState({
        username: "",
        password: "",
      });

      this.props.handleLoginUser(user);
      this.props.handlePageChange("home");
    } else {
      alert(
        "Invalid username or password. If you are new here, please proceed to the sign up page to create your account!"
      );
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div className="login-page">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <button
              className="login-back-button"
              onClick={() => this.props.handleLandingPage()}
            >
              back to previous page
            </button>
            <h1 className="login-title">Log in to notes.</h1>
            <div>
              <label className="login-labels">
                Username:
                <input
                  type="text"
                  value={username}
                  className="login-input-field"
                  name="username"
                  onChange={(event) => this.handleInputChange(event)}
                  required
                />
              </label>
              <br />
              <label className="login-labels">
                Password :
                <input
                  type="password"
                  value={password}
                  className="login-input-field"
                  name="password"
                  onChange={(event) => this.handleInputChange(event)}
                  required
                />
              </label>
            </div>

            <button className="login-submit-button" type="submit">
              log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

// managed to solve login component, able to check for existing users, and return alert statement if the username/pw is not found.
