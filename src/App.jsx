/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate, Route, Routes, useMatch } from 'react-router-dom';
import MenuBar from './component/MenuBar/MenuBar';
import Dashboard from './pages/DashBoard/Dashboard';
import ManageCategory from './pages/ManageCategories/ManageCategory';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import ManageItems from './pages/ManageItem/ManageItems';
import Explore from './pages/Explore/Explore';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import { useContext } from 'react';
import { AppConstant } from './Utils/Constant';
import { AppContext } from './Context/AppContext';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  const { auth } = useContext(AppContext);
  const isLoginPageToggle = useMatch('/login');

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  const ProtectedRoute = ({ element, allowedRole }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRole && !allowedRole.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return element;
  };

  return (
    <div>
      {!isLoginPageToggle && <MenuBar />}

      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        {/* Admin Routes only */}
        <Route path="/category" element={<ProtectedRoute element={<ManageCategory />} allowedRole={['ROLE_ADMIN']} />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRole={['ROLE_ADMIN']} />} />
        <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRole={['ROLE_ADMIN']} />} />

        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
