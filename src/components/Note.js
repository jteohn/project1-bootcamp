import React from "react";
import trash from "../assets/trash.png";

class Note extends React.Component {
  render() {
    const { id, title, text, date, handleDeleteNote } = this.props;

    return (
      <div className="note">
        <span className="note-title noteTitle-content">{title}</span>
        <span className="note-description note-content">{text}</span>
        <div className="note-footer">
          <small>{date}</small>
          <img
            className="delete-icon"
            src={trash}
            alt="delete icon"
            height="25px"
            onClick={() => handleDeleteNote(id)}
          />
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
