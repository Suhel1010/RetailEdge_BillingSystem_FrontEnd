import React, { useCallback, useContext, useState } from 'react';
import './Login.css';
import toast from 'react-hot-toast';
import { login } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { SetAuthData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setData(e => ({ ...e, [name]: value }));
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(data);
      if (response.status === 200) {
        toast.success('logged in successfully.');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        SetAuthData(response.data.token, response.data.role);
        navigate('/dashboard'); //for redirect dashboard component after login
      }
    } catch (error) {
      console.log(error);
      toast.error('email or password invalid !!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">
      <div className="card shadow-lg w-100 style={{maxWidth:'480px'}}">
        <div className="card-body">
          <div className="text-center">
            <h1 className="card-title ">Sign in</h1>
            <p className="card-text text-muted">Welcome have a great day</p>
          </div>
          <div className="mt-2">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-2">
                <label htmlFor="email" className="form-label text-muted">
                  Email address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Please enter email "
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="***************"
                  className="form-control"
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
