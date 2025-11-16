import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="bg-light d-flex align-item-center justify-content-center vh-100 login-background">
      <div className="card shadow-lg w-100 style={{maxWidth:'480px'}}">
        <div className="card-bod">
          <div className="text-center">
            <h1 className="card-title ">Sign in</h1>
            <p className="card-text text-muted">Welcome have a great day</p>
          </div>
                  <div className="mt-4">
                      <form action="">
                          <div className='mb-4'>
                              <label htmlFor='email' className='form-label text-muted'>
                                  Email address
                              </label>
                          </div>
                      </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
