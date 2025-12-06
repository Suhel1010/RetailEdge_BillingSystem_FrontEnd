import React, { useState } from 'react';
import { deleteUser } from '../../service/UserService';
import toast from 'react-hot-toast';

const UserList = ({ users, setUsers }) => {
  const [loading, setLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const filterUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteByUserId = async userId => {
    try {
      setLoading(userId);
      const response = await deleteUser(userId);
      if (response.status == 204) {
        const updatedUser = users.filter(u => u.userId !== userId);
        setUsers(updatedUser);
        toast.success('User deleted successfully.');
      } else toast('User not deleted !!');
    } catch (error) {
      console.error(error);
      toast.error('User not deleted !!');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      className="user_list_container"
      style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="search by keyword"
            className="form-control"
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filterUsers.map((u, index) => (
          <div key={index} className="col-12">
            <div className="p-3 bg-black rounded-4">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{u.name}</h5>
                  <h5 className="mb-1 text-white">{u.email}</h5>
                </div>
                <div>
                  <button
                    className=" btn btn-danger btn-sm"
                    onClick={() => deleteByUserId(u.userId)}
                    disabled={loading == u.userId}
                  >
                    {loading === u.userId ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      </>
                    ) : (
                      <i className="bi bi-trash"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
