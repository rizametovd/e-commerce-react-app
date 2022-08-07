import classes from './AdminPage.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../../../layouts/adminLayouts/Header/Header';
import Sidebar from '../../../layouts/adminLayouts/Sidebar/Sidebar';
import Main from '../../../layouts/adminLayouts/Main/Main';

const AdminPage: React.FC = () => {
  return (
    <div className={classes.admin}>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default AdminPage;
