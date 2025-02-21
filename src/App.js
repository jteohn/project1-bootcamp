import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import LandingHeader from "./pages/Landing";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      search: "",
      currentPage: "landing",
      currentUser: null,
      allUsers: [],
    };
  }

  // assign a "page" parameter so that we can pass the "page" later in the render() component.
  handlePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  // pass this function to Login component to check if it is an existing user stored in local storage
  handleLogin = (user) => {
    const { username, password } = user;
    // retrieve if any, else, return empty array.
    const storedUserList = JSON.parse(localStorage.getItem("allUsers")) || [];

    console.log(`storedUserList: `, storedUserList);

    const checkForExistingUser = storedUserList.find(
      (existingUser) =>
        existingUser.username === username && existingUser.password === password
    );

    // if checkForExistingUser is true, update state.
    if (checkForExistingUser) {
      this.setState({
        currentUser: checkForExistingUser,
      });
    }
  };

  handleSignupComplete = (newUser) => {
    this.setState({ currentUser: newUser });
    console.log("New user signed up: ", newUser);
  };

  handleLogout = () => {
    this.setState({
      currentUser: null,
      currentPage: "landing",
    });
    alert(`You have successfully logged out. Thank you for using notes!`);
  };

  render() {
    const { currentPage, currentUser } = this.state;

    let pageNavigation;

    if (currentPage === "login") {
      pageNavigation = (
        <Login
          handleLandingPage={() => this.handlePage("landing")}
          handlePageChange={() => this.handlePage("home")}
          handleLoginUser={this.handleLogin}
        />
      );
    } else if (currentPage === "signup") {
      pageNavigation = (
        <Signup
          handleLandingPage={() => this.handlePage("landing")}
          handlePageChange={() => this.handlePage("home")}
          handleSignupComplete={this.handleSignupComplete}
        />
      );
    } else if (currentPage === "home") {
      pageNavigation = (
        <Home
          handleLandingPage={() => this.handlePage("landing")}
          handleLogout={this.handleLogout}
          currentUser={currentUser}
        />
      );
    } else {
      pageNavigation = (
        <div className="landing-page">
          <LandingHeader />
          <div className="landing-buttons">
            <button
              className="landing-signup-button"
              onClick={() => this.handlePage("signup")}
            >
              sign up
            </button>
            <button
              className="landing-login-button"
              onClick={() => this.handlePage("login")}
            >
              log in
            </button>
          </div>
          <button
            className="landing-guest-button"
            onClick={() => this.handlePage("home")}
          >
            or enter as Guest
          </button>
        </div>
      );
    }
    return <div className="App-container">{pageNavigation}</div>;
  }
}

export default App;
