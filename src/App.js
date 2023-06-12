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
    // not sure if we need this for home page to render out notes?
    if (checkForExistingUser) {
      this.setState({
        currentUser: checkForExistingUser,
      });
    }
  };

  // to pass this function to Home component -- to be actioned.
  handleLogout = () => {
    this.setState({
      currentUser: null,
    });
  };

  render() {
    const { currentPage, currentUser } = this.state;

    let pageNavigation;

    if (currentPage === "login") {
      pageNavigation = (
        //pass "handleLandingPage" & "handlePageChange" as props to Login (child)
        <Login
          handleLandingPage={() => this.handlePage("landing")}
          handlePageChange={() => this.handlePage("home")}
          handleLoginUser={this.handleLogin}
          currentUser={currentUser}
        />
      );
    } else if (currentPage === "signup") {
      pageNavigation = (
        //pass "handleLandingPage" & "handlePageChange" as props to Signup (child)
        <Signup
          handleLandingPage={() => this.handlePage("landing")}
          handlePageChange={() => this.handlePage("home")}
        />
      );
    } else if (currentPage === "home") {
      pageNavigation = (
        //pass "handleLandingPage" as props to Home (child)
        <Home
          handleLandingPage={() => this.handlePage("landing")}
          handleLogout={this.handleLogout}
        />
      );
    } else {
      // since currently our this.state.currentPage is at Landing, the following will be rendered out:
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
