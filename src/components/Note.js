import React from "react";
import trash from "../assets/trash.png";
import expand from "../assets/expand.png";
import collapse from "../assets/collapse.png";

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      // obtain info from Note.js' parent component --> NoteList.js
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

  handleDelete = () => {
    const { id, handleDeleteNote } = this.props;
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      handleDeleteNote(id);
    }
  };

  render() {
    const { id, title, text, date, expanded, handleExpandNote } = this.props;

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

    const expandedTextStyle = expanded
      ? { height: "60vh" }
      : { height: "10vh" };

    const expandedTitleStyle = expanded
      ? { height: "10vh" }
      : { height: "5vh" };

    return (
      <div className={mainClassName}>
        {/* NOTE TITLE */}
        {isEditing ? (
          <textarea
            className="edit-TitleBox"
            type="text"
            value={updatedTitle}
            placeholder="add title here"
            onChange={this.handleEditTitle}
            style={expandedTitleStyle}
          />
        ) : (
          <span className="notes-title">{title}</span>
        )}
        {/* NOTE TEXT */}
        {isEditing ? (
          <textarea
            className="edit-TextBox"
            value={updatedText}
            placeholder="add text here"
            onChange={this.handleEditText}
            style={expandedTextStyle}
          />
        ) : (
          <span className="notes-text">{text}</span>
        )}
        {/* NOTE FOOTER */}
        <div className="notes-footer">
          <small>{date}</small>
          {/* <button onClick={() => handleSaveNotes(id)}>♥️</button> */}
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
            onClick={this.handleDelete}
          />
          {expanded ? collapseIcon : expandIcon}
        </div>
      </div>
    );
  }
}

export default Note;
