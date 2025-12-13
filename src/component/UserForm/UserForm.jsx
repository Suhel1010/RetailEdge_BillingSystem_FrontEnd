/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { addUser } from '../../service/UserService';
import toast from 'react-hot-toast';
import './UserForm.css';

const UserForm = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ROLE_ADMIN',
  });

  const onSubmitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addUser(data);
      setUsers(u => [...u, response.data]);
      toast.success('user added successfully.');
      setData({
        name: '',
        email: '',
        password: '',
        role: 'ROLE_USER',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error adding user');
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setData(data => ({ ...data, [name]: value }));
  };

  return (
    <div className="user-form-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-12 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="John Doe"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="yourname@gmail.com"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="*******************"
                    onChange={onChangeHandler}
                    value={data.password}
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    </>
                  ) : (
                    'save'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
