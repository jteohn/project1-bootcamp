import React from "react";

class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteTitle: "",
      noteText: "",
    };
  }

  handleTitleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      noteTitle: event.target.value,
    });
  };

  handleTextChange = (event) => {
    console.log(event.target.value);

    this.setState({
      noteText: event.target.value,
    });
  };

  handleSaveNote = () => {
    const { handleAddNote } = this.props;
    const { noteTitle, noteText } = this.state;
    // before saving the note, call .trim() to remove whitespace from start & end of the string.
    // after removing the whitespace, to check if there is still any text remaining by using .length > 0
    // only if it fulfils the following condition will the note be saved by calling the handleAddNote function.
    if ((noteTitle || noteText).trim().length > 0) {
      handleAddNote(noteTitle, noteText);
      this.setState({
        noteTitle: "",
        noteText: "",
      });
    }
  };

  render() {
    const { noteTitle, noteText } = this.state;

    return (
      // put a spacing between "note" & "new" so that we can reuse the CSS styling from note.js!!
      <div className="note new">
        <textarea
          className="new-note-title"
          rows="1"
          cols="10"
          placeholder="Title"
          value={noteTitle}
          onChange={this.handleTitleChange}
        ></textarea>
        <textarea
          rows="8"
          cols="10"
          placeholder="type your note here..."
          value={noteText}
          onChange={this.handleTextChange}
        ></textarea>
        <div className="note-footer">
          <button className="save-newNote-button" onClick={this.handleSaveNote}>
            save
          </button>
        </div>
      </div>
    );
  }
}

export default AddNote;
