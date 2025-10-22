import { Route, Routes } from 'react-router-dom';
import MenuBar from './component/MenuBar/MenuBar';
import Dashboard from './pages/DashBoard/Dashboard';
import ManageCategory from './pages/ManageCategories/ManageCategory';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import ManageItems from './pages/ManageItem/ManageItems';
import Explore from './pages/Explore/Explore';

const App = () => {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
