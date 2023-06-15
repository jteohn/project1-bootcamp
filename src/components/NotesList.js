import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

class NotesList extends React.Component {
  render() {
    const {
      notes,
      handleAddNote,
      handleDeleteNote,
      handleEditNote,
      handleToggleExpansion,
    } = this.props;

    return (
      <div className="notes-list">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            date={note.date}
            expanded={note.expanded}
            handleDeleteNote={handleDeleteNote}
            handleEditNote={handleEditNote}
            handleExpandNote={handleToggleExpansion}
          />
        ))}
        <AddNote handleAddNote={handleAddNote} />
      </div>
    );
  }
}

export default NotesList;

// note list is to store all the notes
