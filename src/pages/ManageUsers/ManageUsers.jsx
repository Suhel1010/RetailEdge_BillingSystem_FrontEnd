import React, { useEffect, useState } from 'react';
import './ManageUsers.css';
import UserForm from '../../component/UserForm/UserForm';
import UserList from '../../component/UserList/UserList';
import toast from 'react-hot-toast';
import { getAllUsers } from '../../service/UserService';
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loadding, setLoading] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Unable to fetch users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="users-container text-light">
      <div className="left-column">
        <UserForm setUsers={setUsers} />
      </div>
      <div className="right-column">
        <UserList users={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default ManageUsers;
