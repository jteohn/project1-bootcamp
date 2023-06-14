import React from "react";

class SavedNotes extends React.Component {
  render() {
    const { savedNotes } = this.props;

    return (
      <div>
        <h1>Saved Notes</h1>
        {/* Display saved notes */}
        {savedNotes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SavedNotes;
