import React from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";
import NoteList from "../components/NotesList";
import Search from "../components/Search";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      search: "",
    };
  }

  // componentDidMount lifecycle upon user signs in to load the previous notes from local storage when the component mounts (renders). Use the getter method to retrieve notes from localstorage.
  componentDidMount() {
    const storedNotes = localStorage.getItem("storedNotes");

    // if there is indeed notes stored in local storage, convert them + display it in Home page.
    if (storedNotes) {
      const allStoredNotes = JSON.parse(storedNotes);
      const { currentUser } = this.props;

      // breakdown: (1) this.props.currentUser accesses the 'currentUser' prop that is passed to the component. This prop will contain an object representing the current user.
      // (2) { username } is a destructuring assignment syntax, which extracts the "username" property from the 'currentUser' object and assigns it to a new variable called username.
      // (3) it is the same as "this.props.currentUser.username"

      if (currentUser) {
        const { username } = currentUser;

        // filter all the notes to only show notes tagged to the username
        const extractUserNotes = allStoredNotes[username] || [];
        this.setState({
          notes: extractUserNotes,
        });
      } else {
        this.setState({
          notes: [],
          currentUser: "Guest",
        });
      }
    }
  }

  // componentDidUpdate to trigger everytime when there are changes to the notes state (e.g., added new notes, edited or deleted notes). Check that the previous state of "notes" is different from the current state before saving it to local storage using setter method

  // note: React handles the passing of 'prevProps' and 'prevState' to componentDidUpdate internally and provide values to us. We do not have to explicitly pass the data.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      const storedUserNotes = localStorage.getItem("storedNotes");
      let allNotes = storedUserNotes ? JSON.parse(storedUserNotes) : {};

      const { currentUser } = this.props;

      if (currentUser) {
        const { username } = currentUser;
        allNotes[username] = this.state.notes;
      } else {
        const username = "Guest";
        allNotes[username] = this.state.notes;
      }

      // store notes based on username
      localStorage.setItem("storedNotes", JSON.stringify(allNotes));
    }
  }

  // create a addNote helper function to pass in the information that user has keyed in. The information will then be displayed in our AddNote.js
  addNote = (noteTitle, noteText) => {
    console.log(noteTitle);
    const date = new Date();
    const newNoteTemplate = {
      id: nanoid(),
      title: noteTitle,
      text: noteText,
      date: date.toLocaleDateString(),
      username: this.props.currentUser
        ? this.props.currentUser.username
        : "Guest",
      expanded: false,
    };

    // use spread operator as we do not want to mutate our this.state.note
    const newNotes = [...this.state.notes, newNoteTemplate];

    // update our state so the 'notes' state will re-render whenever a new note is added!
    this.setState({
      notes: newNotes,
    });
  };

  // delete note based on the note's id
  deleteNote = (id) => {
    // filter() creates a new array filled with elements that pass the text provided by the function below.
    const newNotesArray = this.state.notes.filter((note) => note.id !== id);

    // re-render the notes' state with the updated list of notes after user has deleted a note.
    this.setState({
      notes: newNotesArray,
    });
  };

  editNote = (id, updatedTitle, updatedText) => {
    // pass a parameter in seState to ensure that the most up-to-date..
    this.setState((prevState) => {
      // .map() to create a new array w/o modifying the original array
      const updatedNotes = prevState.notes.map((note) => {
        if (note.id === id) {
          return {
            // use spread operator to preserve existing properties of the 'note' object while updating the title & text properties with the new values.
            ...note,
            title: updatedTitle,
            text: updatedText,
          };
        }
        return note;
      });
      return {
        notes: updatedNotes,
      };
    });
  };

  toggleNoteExpansion = (id) => {
    this.setState((prevState) => {
      const expandedNote = prevState.notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            expanded: !note.expanded,
          };
        }
        return note;
      });
      return {
        notes: expandedNote,
      };
    });
  };

  handleSearch = (searchText) => {
    this.setState({
      search: searchText,
    });
  };

  render() {
    const { notes, search } = this.state;

    return (
      <div className="App-container">
        <header className="App-header">
          <div className="home-nav">
            <Header />
            <button
              className="home-back-button"
              onClick={() => this.props.handleLogout()}
            >
              Sign out
            </button>
          </div>
          <Search handleSearch={this.handleSearch} />
          <NoteList
            notes={notes.filter(
              (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.text.toLowerCase().includes(search.toLowerCase())
            )}
            handleAddNote={this.addNote}
            handleDeleteNote={this.deleteNote}
            handleEditNote={this.editNote}
            handleToggleExpansion={this.toggleNoteExpansion}
          />
        </header>
      </div>
    );
  }
}

export default Home;
