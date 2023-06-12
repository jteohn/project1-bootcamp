import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LandingHeader from "./pages/Landing";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      search: "",
      // isLoggedIn: false,
      currentPage: "landing",
    };
  }

  handlePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    // const { notes, search, currentPage } = this.state;
    const { currentPage } = this.state;

    let pageNavigation;

    if (currentPage === "login") {
      pageNavigation = (
        <Login
          goBackLandingPage={() => this.handlePage("landing")}
          handlePageChange={() => this.handlePage("home")}
        />
      );
    } else if (currentPage === "home") {
      pageNavigation = <Home />;
    } else {
      pageNavigation = (
        <div className="landing-page">
          <LandingHeader />
          <button
            className="landing-login-button"
            onClick={() => this.handlePage("login")}
          >
            log in
          </button>
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

// // create a addNote helper function to pass in the information that user has keyed in. The information will then be displayed in our AddNote.js
// addNote = (noteTitle, noteText) => {
//   console.log(noteTitle);
//   const date = new Date();
//   const newNoteTemplate = {
//     id: nanoid(),
//     title: noteTitle,
//     text: noteText,
//     date: date.toLocaleDateString(),
//     expanded: false,
//   };

//   // use spread operator as we do not want to mutate our this.state.note
//   const newNotes = [...this.state.notes, newNoteTemplate];

//   // update our state so the 'notes' state will re-render whenever a new note is added!
//   this.setState({
//     notes: newNotes,
//   });
// };

// // delete note based on the note's id
// deleteNote = (id) => {
//   // filter() creates a new array filled with elements that pass the text provided by the function below.
//   const newNotesArray = this.state.notes.filter((note) => note.id !== id);

//   // re-render the notes' state with the updated list of notes after user has deleted a note.
//   this.setState({
//     notes: newNotesArray,
//   });
// };

// editNote = (id, updatedTitle, updatedText) => {
//   // pass a parameter in seState to ensure that the most up-to-date..
//   this.setState((prevState) => {
//     // .map() to create a new array w/o modifying the original array
//     const updatedNotes = prevState.notes.map((note) => {
//       if (note.id === id) {
//         return {
//           // use spread operator to preserve existing properties of the 'note' object while updating the title & text properties with the new values.
//           ...note,
//           title: updatedTitle,
//           text: updatedText,
//         };
//       }
//       return note;
//     });
//     return {
//       notes: updatedNotes,
//     };
//   });
// };

// // Enabling Local Storage
// componentDidMount() {
//   //retrieve "notes" with getItem from json data
//   const currentNotesData = localStorage.getItem("notes");
//   // if some notes data already exist, convert them from json data to object, else, display empty notes.
//   const currentNotes = currentNotesData ? JSON.parse(currentNotesData) : [];
//   this.setState({
//     notes: currentNotes,
//   });
// }

// //use setter method here to pass the updated notes to store in local storage as json data
// componentDidUpdate(prevProps, prevState) {
//   const updatedNotesData = JSON.stringify(this.state.notes);
//   localStorage.setItem("notes", updatedNotesData);
// }

// toggleNoteExpansion = (id) => {
//   this.setState((prevState) => {
//     const expandedNote = prevState.notes.map((note) => {
//       if (note.id === id) {
//         return {
//           ...note,
//           expanded: !note.expanded,
//         };
//       }
//       return note;
//     });
//     return {
//       notes: expandedNote,
//     };
//   });
// };

// handleSearch = (searchText) => {
//   this.setState({
//     search: searchText,
//   });
// };
