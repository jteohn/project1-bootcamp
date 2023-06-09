import React from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import NoteList from "./components/NotesList";
import Search from "./components/Search";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          id: nanoid(),
          title: "I am title",
          text: "I am description (1)",
          date: "08/06/2023",
        },
        {
          id: nanoid(),
          title: "I am title",
          text: "I am description (2)",
          date: "10/06/2023",
        },
        {
          id: nanoid(),
          title: "I am title",
          text: "I am description (3)",
          date: "15/06/2023",
        },
      ],
      search: "",
    };
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
          <Header />
          <Search handleSearch={this.handleSearch} />
          <NoteList
            notes={notes.filter(
              (note) =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.text.toLowerCase().includes(search.toLowerCase())
            )}
            handleAddNote={this.addNote}
            handleDeleteNote={this.deleteNote}
          />
        </header>
      </div>
    );
  }
}

export default App;

// add a responsive calendar??
