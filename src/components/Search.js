import React from "react";
import magnifier from "../assets/magnifier.png";

class Search extends React.Component {
  render() {
    const { handleSearch } = this.props;

    let searchIcon = <img src={magnifier} alt="search icon" height="18px" />;

    return (
      <div className="search">
        {searchIcon}
        <input
          type="search"
          placeholder="type to search"
          // pass "event" as para to access information about the event (i.e. seach text) that was entered.
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>
    );
  }
}

export default Search;

// capture value that user has keyed in
// only display notes that has the value the user keys in

//----

//     return (
//       <div>
//         <h1 className="page-title">notes.</h1>
//         <br />
//         <div className="search-bar">
//           <form>
//             <input
//               type="search"
//               placeholder="type to search"
//               className="search-field"
//             />
//             <button type="submit" class="search-button">
//               {searchIcon}
//             </button>
