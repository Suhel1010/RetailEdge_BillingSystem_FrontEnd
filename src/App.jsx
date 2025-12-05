/* eslint-disable react/react-in-jsx-scope */
import { Route, Routes, useMatch } from 'react-router-dom';
import MenuBar from './component/MenuBar/MenuBar';
import Dashboard from './pages/DashBoard/Dashboard';
import ManageCategory from './pages/ManageCategories/ManageCategory';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import ManageItems from './pages/ManageItem/ManageItems';
import Explore from './pages/Explore/Explore';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';

const App = () => {
  const isLoginPageToggle = useMatch('/login');
  return ( 
    <div>
      {!isLoginPageToggle && <MenuBar />}

      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
