import React from "react";
import magnifier from "../assets/magnifier.png";

class Header extends React.Component {
  render() {
    let searchIcon = (
      <img className="search-icon" src={magnifier} alt="search icon" />
    );

    return (
      <div>
        <h1 className="page-title">notes.</h1>
        <br />
        <div className="search-bar">
          <form>
            <input
              type="search"
              placeholder="type to search"
              className="search-field"
            />
            <button type="submit" class="search-button">
              {searchIcon}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
