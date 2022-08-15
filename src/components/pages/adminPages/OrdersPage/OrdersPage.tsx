import Actions from '../../../layouts/adminLayouts/Actions/Actions';
import Content from '../../../layouts/adminLayouts/Content/Content';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import Order from '../../../admin/Order/Order';
import Card from '../../../UI/Card/Card';
import Loader from '../../../UI/Loader/Loader';
import Placeholder from '../../../UI/Placeholder/Placeholder';
import { NO_ORDERS } from '../../../../constants/messages';

const OrdersPage: React.FC = () => {
  const { orders, isLoading } = useSelector((state: RootState) => state.common);

  return (
    <>
      <Actions title={'Заказы'} />

      <Content>
        <>
          {isLoading && <Loader />}
          {!isLoading && (
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
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6}>
                          <Placeholder text={NO_ORDERS} />
                        </td>
                      </tr>
                    )}

                    {orders.map(({ user, totalPrice, totalWeight, totalDiscount, cart, timestamp, id }) => (
                      <Order
                        user={user}
                        cart={cart}
                        totalPrice={totalPrice}
                        timestamp={timestamp}
                        key={id}
                        totalWeight={totalWeight}
                        totalDiscount={totalDiscount}
                      />
                    ))}
                  </tbody>
                </table>
              </>
            </Card>
          )}
        </>
      </Content>
    </>
  );
};

export default OrdersPage;
