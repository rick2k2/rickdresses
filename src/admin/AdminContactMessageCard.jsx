import React, { useState } from "react";
import "../styles/AdminContactMessageCard.css";

const AdminContactMessageCard = ({ msg, onDelete, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className="contact-msg-card">
      <p>
        <strong>Name:</strong> {msg.name}
      </p>
      <p>
        <strong>Email:</strong> {msg.email}
      </p>
      <p>
        <strong>Message:</strong> {msg.message}
      </p>
      <p>
        <strong>Date:</strong> {new Date(msg.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {msg.replied ? (
          <span className="replied">Replied</span>
        ) : (
          <span className="pending">Pending</span>
        )}
      </p>

      {!msg.replied && (
        <>
          {showReply ? (
            <>
              <textarea
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={() => {
                  onReply(msg._id, replyText);
                  setReplyText("");
                  setShowReply(false);
                }}
              >
                Send Reply
              </button>
              <button
                onClick={() => setShowReply(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setShowReply(true)}>Reply</button>
          )}
        </>
      )}
      <button onClick={() => onDelete(msg._id)} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default AdminContactMessageCard;
