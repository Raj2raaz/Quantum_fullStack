import React, { useContext, useState } from "react";
import "./AuthForm.css"; 
import { FaUser, FaLock, FaEnvelope, FaCalendar, FaUserTie } from "react-icons/fa"; 
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const {handleLogin, handleSignup} = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name : "",
    username : "",
    email : "",
    password : "",
    dob : "",
    role : "",
  })

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors

    if (isLogin) {
      const response = await handleLogin({ email: formData.email, password: formData.password });
      if (response.error) {
        setError(response.error);
      } else {
        navigate("/dashboard"); 
      }
    } else {
      const userData = {
        name: formData.fullName, 
        username: formData.username,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        role: formData.role,
    };

    const response = await handleSignup(userData);

      console.log(formData);
      if (response.error) {
        setError(response.error);
      } else {
        setIsLogin(true); 
      }
    }
  };


  return (
    <div className="container">
      <h2>{isLogin ? "LOG IN" : "SIGN UP"}</h2>

      <div className="profile-icon">
        <FaUser size={40} color="white" />
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="input-container">
              <i><FaUser /></i>
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="input-container">
              <i><FaUser /></i>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="input-container">
              <i><FaCalendar /></i>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>

            <div className="input-container">
              <i><FaEnvelope /></i>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </div>
          </>
        )}

        {isLogin && (
          <div className="input-container">
            <i><FaUser /></i>
            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
        )}

        <div className="input-container">
          <i><FaLock /></i>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>

        {!isLogin && (
          <div className="input-container">
            <i><FaUserTie /></i>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
        )}

        <button type="submit">{isLogin ? "LOGIN" : "SIGN UP"}</button>
      </form>

      <p className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </p>
    </div>
  );
};

export default AuthForm;
