"use client";

import { useState, useEffect } from "react";
import "./CommentSection.css";
import Comment from "../Comment/Comment";

/**
 Plan:

 - Be able to put a comment under a comment
 - Style comment in a way where it has extra margin
 - Need a nested comment object

 - how do we reply to a comment?
  - we have a tree structure:
    - traverse tree and add node or
    - save adj list and build tree each time?

 - Try storing that in state first, then context, then reducer?
 */

// Normalized state structure
const initialState = {
  // Map of all comments by ID
  byId: {
    1: { id: 1, message: "comment", parentId: null, children: [2] },
    2: { id: 2, message: "comment of a comment", parentId: 1, children: [3] },
  },
  // Array of root comment IDs
  rootIds: [1, 4, 5],
};

const CommentSection = ({ imageId }) => {
  const [state, setState] = useState(initialState);
  const [newMessage, setNewMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [nextId, setNextId] = useState(6);

  // Add a new comment
  const addComment = (parentId, message) => {
    const newId = nextId;
    setNextId((prev) => prev + 1);

    const newComment = {
      id: newId,
      message,
      parentId,
      children: [],
    };

    setState((prevState) => {
      const newById = { ...prevState.byId, [newId]: newComment };

      // If it's a root comment
      if (!parentId) {
        return {
          byId: newById,
          rootIds: [...prevState.rootIds, newId],
        };
      }

      // If it's a reply, update the parent's children
      const parent = newById[parentId];
      const updatedParent = {
        ...parent,
        children: [...parent.children, newId],
      };

      return {
        byId: { ...newById, [parentId]: updatedParent },
        rootIds: prevState.rootIds,
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addComment(selectedId, newMessage);
    setNewMessage("");
    setSelectedId(null);
  };

  // Render a comment and its children recursively
  const renderComment = (commentId) => {
    const comment = state.byId[commentId];
    if (!comment) return null;

    return (
      <Comment
        key={commentId}
        id={commentId}
        message={comment.message}
        isSelected={commentId === selectedId}
        onSelect={() => setSelectedId(commentId)}
      >
        {comment.children.map((childId) => renderComment(childId))}
      </Comment>
    );
  };

  return (
    <div className="comment-section">
      <div className="comments-list">{state.rootIds.map((id) => renderComment(id))}</div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={selectedId ? "Reply to comment..." : "Add a comment..."}
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          {selectedId ? "Reply" : "Post"}
        </button>
        {selectedId && (
          <button type="button" onClick={() => setSelectedId(null)} className="cancel-reply">
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentSection;
