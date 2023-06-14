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

    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    const storedUserList = JSON.parse(localStorage.getItem("allUsers")) || [];

    // check if the user input username & password match any data from our local storage
    const user = storedUserList.find(
      (user) => user.username === username && user.password === password
    );

    // if user already exists in local storage
    if (user) {
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
