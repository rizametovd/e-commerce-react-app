import classes from './AdminPage.module.css';
import { Outlet } from 'react-router-dom';
import Header from '../../../layouts/adminLayouts/Header/Header';
import Sidebar from '../../../layouts/adminLayouts/Sidebar/Sidebar';
import Main from '../../../layouts/adminLayouts/Main/Main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { fetchOrders } from '../../../../store/CommonSlice';
import Toast from '../../../UI/Toast/Toast';
const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { alert } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className={classes.admin}>
      <Header />
      <Sidebar />
      <Main>
        <>
          <Toast type={alert.type} message={alert.message} />
          <Outlet />
        </>
      </Main>
    </div>
  );
};

export default AdminPage;
