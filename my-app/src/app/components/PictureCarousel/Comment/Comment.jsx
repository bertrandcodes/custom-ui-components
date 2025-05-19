"use client";

import "./Comment.css";

const Comment = ({ id, message, isSelected, onSelect, children }) => {
  return (
    <div className={`comment ${isSelected ? "selected" : ""}`}>
      <div className="comment-content">
        <p className="comment-message">{message}</p>
        <button onClick={onSelect} className="reply-button">
          Reply
        </button>
      </div>

      {children && children.length > 0 && <div className="comment-children">{children}</div>}
    </div>
  );
};

export default Comment;
