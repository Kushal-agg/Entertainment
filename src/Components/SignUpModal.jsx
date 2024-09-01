import React, { useState } from "react";
import "./Modal.scss";
import { FaUserPlus } from "react-icons/fa";

const SignupModal = ({ onClose }) => {
  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h2 style={{ color: "black" }}>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="signup-name">Name</label>
            <input type="text" id="signup-name" />
          </div>
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input type="email" id="signup-email" />
          </div>
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input type="password" id="signup-password" />
          </div>
          <button className="submit-button">
            <FaUserPlus /> Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
