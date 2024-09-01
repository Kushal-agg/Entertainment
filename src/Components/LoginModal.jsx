import React, { useState } from "react";
import "./Modal.scss";
import { FaSignInAlt } from "react-icons/fa";

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay open">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          <h2 style={{ color: "black" }}>Login</h2>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" />
          </div>
          <button className="submit-button">
            <FaSignInAlt /> Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
