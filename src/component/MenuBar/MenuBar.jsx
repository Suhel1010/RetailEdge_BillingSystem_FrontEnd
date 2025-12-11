import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets..js';
import './MenuBar.css';
import { AppContext } from '../../Context/AppContext.jsx';
const MenuBar = () => {
  const navigate = useNavigate();
  const { SetAuthData, auth } = useContext(AppContext);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    SetAuthData(null, null);
    navigate('/login');
  };

  const isActive = path => {
    return location.pathname === path;
  };

  const isAdmin = auth.role === 'ROLE_ADMIN';

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
        <a className="navbar-brand" href="#">
          <img src={assets.logo} alt="Logo" height={40} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse p-2" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isActive('/dashboard') ? 'fw-bold text-warning' : ''
                }`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isActive('/explore') ? 'fw-bold text-warning' : ''
                }`}
                to="/explore"
              >
                Explore
              </Link>
            </li> 
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActive('/items') ? 'fw-bold text-warning' : ''
                    }`}
                    to="/items"
                  >
                    ManageItem
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActive('/category') ? 'fw-bold text-warning' : ''
                    }`}
                    to="/category"
                  >
                    ManageCategories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActive('/users') ? 'fw-bold text-warning' : ''
                    }`}
                    to="/users"
                  >
                    ManageUsers
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  isActive('/orders') ? 'fw-bold text-warning' : ''
                }`}
                to="/orders"
              >
                OrderHistory
              </Link>
            </li>
          </ul>
          {/* add user profile */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                id="navbarDropdown "
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={assets.profile} alt="" height={36} width={36} />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a href="#" className="dropdown-item">
                    Setting
                  </a>
                  <a href="#" className="dropdown-item">
                    Activity-log
                  </a>
                  <hr className="dropdown-divider" />
                  <a href="#" className="dropdown-item" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </div>
  );
};
export default MenuBar;
