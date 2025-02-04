import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getAllUsers } from "../ApiService";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const avatars = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (!response.error) {
        const usersWithStatus = response.users.map((user, index) => ({
          ...user,
          status: getRandomStatus(), 
          avatar: avatars[index % avatars.length], 
        }));
        setUsers(usersWithStatus);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const getRandomStatus = () => {
    const statuses = ["Active", "Suspended", "Inactive"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="user-info">
                    <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                    {user.name}
                  </td>
                  <td>{new Date(user.dob).toLocaleDateString("en-GB")}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`status status-${user.status.toLowerCase()}`}>
                      <span className="status-dot"></span> 
                    </span>
                  </td>
                  <td className="action-icons">
                    <FontAwesomeIcon icon={faCog} className="edit-icon" />
                    <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
