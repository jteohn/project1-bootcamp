import React from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  // to trigger an event when user is entering username & password fields
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const storedUserList = JSON.parse(localStorage.getItem("allUsers")) || [];

    const isUsernameTaken = storedUserList.find(
      (user) => user.username === this.state.username
    );

    if (isUsernameTaken) {
      alert(
        "Username already exists! Please choose a different username. If the username belongs to you, please sign in to use notes."
      );
      return;
    }

    const newUser = {
      username: this.state.username,
      password: this.state.password,
    };

    // update the list of all users in a new list --> updatedUserList
    const updatedUserList = [...storedUserList, newUser];
    this.setState({
      username: "",
      password: "",
    });

    localStorage.setItem("allUsers", JSON.stringify(updatedUserList));

    // alert user to inform them that an account has been created
    alert(
      `Welcome, ${this.state.username}! Thank you for signing up with us!!`
    );

    this.props.handlePageChange("home");
    this.props.handleSignupComplete(newUser);
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
            <h1 className="signup-title">Sign up to start using notes.</h1>
            <div>
              <label className="login-labels">
                Username:
                <input
                  name="username"
                  type="text"
                  value={username}
                  className="signup-input-field"
                  onChange={(event) => this.handleInputChange(event)}
                  required
                />
              </label>
              <br />
              <label className="login-labels">
                Create a password:
                <input
                  name="password"
                  type="password"
                  value={password}
                  className="signup-input-field"
                  onChange={(event) => this.handleInputChange(event)}
                  required
                />
              </label>
            </div>

            <button className="signup-submit-button" type="submit">
              sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;

// managed to solve the sign up component error, now it is able to validate if the username has already been registered and show an alert message.
