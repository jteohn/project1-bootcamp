import React from "react";
import trash from "../assets/trash.png";
import expand from "../assets/expand.png";
import collapse from "../assets/collapse.png";

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      // // call this.props to obtain info from Note.js' parent component --> NoteList.js
      updatedTitle: this.props.title,
      updatedText: this.props.text,
    };
  }

  handleEditTitle = (event) => {
    console.log(event.target.value);
    this.setState({
      updatedTitle: event.target.value,
    });
  };

  handleEditText = (event) => {
    console.log(event.target.value);

    this.setState({
      updatedText: event.target.value,
    });
  };

  isEditMode = () => {
    this.setState({
      isEditing: true,
    });
  };

  handleSaveEdits = () => {
    const { id, handleEditNote } = this.props;
    const { updatedTitle, updatedText } = this.state;

    handleEditNote(id, updatedTitle, updatedText);
    this.setState({
      isEditing: false,
    });
  };

  render() {
    const {
      id,
      title,
      text,
      date,
      handleDeleteNote,
      expanded,
      handleExpandNote,
    } = this.props;

    const { isEditing, updatedTitle, updatedText } = this.state;

    const expandIcon = (
      <img
        className="expand-icon"
        src={expand}
        alt="expand-icon"
        height="15px"
        onClick={() => handleExpandNote(id)}
      />
    );
    const collapseIcon = (
      <img
        className="collapse-icon"
        src={collapse}
        alt="collapse-icon"
        height="15px"
        onClick={() => handleExpandNote(id)}
      />
    );

    const mainClassName = `note ${expanded ? "expanded" : ""}`;

    return (
      <div className={mainClassName}>
        {/* NOTE Title */}
        {isEditing ? (
          <input
            className="note-title noteTitle-content"
            type="text"
            value={updatedTitle}
            onChange={this.handleEditTitle}
          />
        ) : (
          <span className="note-title noteTitle-content">{title}</span>
        )}
        {/* NOTE TEXT */}
        {isEditing ? (
          <textarea
            className="update-textField"
            value={updatedText}
            onChange={this.handleEditText}
          />
        ) : (
          <span className="note-description note-content">{text}</span>
        )}
        {/* NOTE FOOTER */}
        <div className="note-footer">
          <small>{date}</small>
          {isEditing ? (
            <button className="edit-note-button" onClick={this.handleSaveEdits}>
              save
            </button>
          ) : (
            <button className="edit-note-button" onClick={this.isEditMode}>
              edit
            </button>
          )}
          <img
            className="delete-icon"
            src={trash}
            alt="delete icon"
            height="25px"
            onClick={() => handleDeleteNote(id)}
          />
          {expanded ? collapseIcon : expandIcon}
        </div>
      </div>
    );
  }
}

export default Note;

// tasks for this component:

// section top -- title
// section middle -- description
// section bottom -- delete icon

// delete icon -- added, done.

// edit function -- note: maybe no need this function since user can edit directly from the notepad itself! can consider changing it to change note bg color function!

// to include edit functionality here as the edit function primarily operates on individual notes and involves updating specific note properties (e.g. title & text). Since the 'edit' function only affects a single note, it makes sense to keep the 'edit' function within the 'Note.js' component. Unless, the 'edit' function allows users to coordinate with multiple notes or requires access to the entire list of notes, then it'll be more appropriate to handle the edit functionality within 'NoteList.js'

// add a button for user to save their edits.
