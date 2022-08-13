
import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Content from '../../../layouts/adminLayouts/Content/Content';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Order from '../../../admin/Order/Order';
import Card from '../../../UI/Card/Card';

const OrdersPage: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.common);
  console.log('orders:', orders);
  return (
    <>
      <Actions title={'Заказы'} />

      <Content>
        <Card fullWidth>
          <>
            <table>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Покупатель</th>
                  <th>Телефон</th>
                  <th>Адрес</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(({ user, totalPrice, totalWeight, totalDiscount, cart, timestamp, id }) => (
                  <Order user={user} cart={cart} totalPrice={totalPrice} timestamp={timestamp} key={id} totalWeight={totalWeight} totalDiscount={totalDiscount} />
                ))}
              </tbody>
            </table>
          </>
        </Card>
      </Content>
    </>
  );
};

export default OrdersPage;
