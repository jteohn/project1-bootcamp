import React from "react";
import Note from "./Note";
import AddNote from "./AddNote";

class NoteList extends React.Component {
  render() {
    const { notes, handleAddNote, handleDeleteNote } = this.props;
    return (
      <div className="notes-list">
        {/* google .map() method */}
        {notes.map((note) => (
          <Note
            id={note.id}
            title={note.title}
            text={note.text}
            date={note.date}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
        <AddNote handleAddNote={handleAddNote} />
      </div>
    );
  }
}

export default NoteList;

// note list is to store all the notes
