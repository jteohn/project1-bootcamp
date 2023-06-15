import React from "react";
import { nanoid } from "nanoid";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import Search from "../components/Search";
// import SavedNotes from "../components/SavedNotes";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      search: "",
      // savedNotes: [],
    };
  }

  componentDidMount() {
    const storedNotes = localStorage.getItem("storedNotes");

    // if there is indeed notes stored in local storage, convert them + display it in Home page.
    if (storedNotes) {
      const allStoredNotes = JSON.parse(storedNotes);
      const { currentUser } = this.props;

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

  handleAddNote = (noteTitle, noteText) => {
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

    const newNotes = [...this.state.notes, newNoteTemplate];

    this.setState({
      notes: newNotes,
    });
  };

  // delete note based on the note's id
  handleDeleteNote = (id) => {
    const updateNotesPostDelete = this.state.notes.filter(
      (note) => note.id !== id
    );
    this.setState({
      notes: updateNotesPostDelete,
    });
  };

  handleEditNote = (id, updatedTitle, updatedText) => {
    // pass a parameter in seState to ensure that the most up-to-date..
    this.setState((prevState) => {
      const updateNotesPostEdit = prevState.notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            title: updatedTitle,
            text: updatedText,
          };
        }
        return note;
      });
      return {
        notes: updateNotesPostEdit,
      };
    });
  };

  // handleSaveNotes = (id) => {
  //   const { notes, savedNotes } = this.state;
  //   const noteToSave = notes.find((note) => note.id === id);
  //   const updatedSavedNotesList = [...savedNotes, noteToSave];
  //   this.setState({
  //     savedNotes: updatedSavedNotesList,
  //   });
  // };

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
              className="home-signout-button"
              onClick={() => this.props.handleLogout()}
            >
              Sign out
            </button>
          </div>
          <Search handleSearch={this.handleSearch} />
          <NotesList
            notes={notes.filter(
              (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.text.toLowerCase().includes(search.toLowerCase())
            )}
            handleAddNote={this.handleAddNote}
            handleDeleteNote={this.handleDeleteNote}
            handleEditNote={this.handleEditNote}
            handleToggleExpansion={this.toggleNoteExpansion}
          />
        </header>
      </div>
    );
  }
}

export default Home;
