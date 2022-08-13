import classes from './AdminPage.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../../../layouts/adminLayouts/Header/Header';
import Sidebar from '../../../layouts/adminLayouts/Sidebar/Sidebar';
import Main from '../../../layouts/adminLayouts/Main/Main';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { fetchOrders } from '../../../../store/CommonSlice';

const AdminPage: React.FC = () => {
const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

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
