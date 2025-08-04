import React, { useEffect, useState } from "react";
import AdminContactMessageCard from "./AdminContactMessageCard";
import axios from "axios";
import "../styles/AdminContact.css";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get("/api/contact", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setMessages(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleReply = async (id, replyText) => {
    try {
      await axios.put(
        `/api/contact/${id}/reply`,
        { replyMessage: replyText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      fetchMessages(); // refresh
    } catch (error) {
      console.error("Reply failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      fetchMessages(); // refresh
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-contact-page">
      <h2>Contact Messages</h2>
      <div className="admin_contact_card_container">
        {messages.length === 0 ? (
          <p>No contact messages found.</p>
        ) : (
          messages.map((msg) => (
            <AdminContactMessageCard
              key={msg._id}
              msg={msg}
              onReply={handleReply}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminContact;
