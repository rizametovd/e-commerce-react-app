import { useState } from 'react';
import { CartItem, Order as OrderItem } from '../../../types/common';
import classes from './Order.module.css';
import OrderCartItem from './OrderCartItem/OrderCartItem';

interface IOrderProps {
  user: OrderItem['user'];
  timestamp: OrderItem['timestamp'];
  totalPrice: OrderItem['totalPrice'];
  totalDiscount: OrderItem['totalDiscount'];
  totalWeight: OrderItem['totalDiscount'];
  cart: CartItem[];
}

const Order: React.FC<IOrderProps> = ({ user, timestamp, totalPrice, cart, totalDiscount, totalWeight }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const date = new Date(timestamp).toLocaleDateString('Ru-ru');

  const toggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <tr onClick={toggle} className={classes['summary-row']}>
        <td className={classes['sumarry-cell']}>{date}</td>
        <td className={classes['sumarry-cell']}>{user.name}</td>
        <td className={classes['sumarry-cell']}>{user.phone}</td>
        <td className={classes['sumarry-cell']}>{user.address}</td>
        <td className={classes['sumarry-cell']}>{totalPrice} ₽</td>
      </tr>

      {isCollapsed && (
        <>
          <tr className={classes['no-pointer-events']}>
            <td colSpan={7}></td>
          </tr>
          <tr>
            <td colSpan={7} className={classes['order-content']}>
              <div>
                <span className={classes['order-content-title']}>Состав заказа</span>

                <table className={classes.table}>
                  <thead>
                    <tr className={classes['no-pointer-events']}>
                      <th>№</th>
                      <th>Название</th>
                      <th>Кол-во</th>
                      <th>Цена</th>
                      <th>Итого</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((cartItem, idx) => (
                        <OrderCartItem
                          key={cartItem.productId}
                          idx={idx + 1}
                          name={cartItem.name}
                          quantity={cartItem.quantity}
                          price={cartItem.price}
                          discount={cartItem.discount}
                          discountedPrice={cartItem.discountedPrice}
                          totalPrice={cartItem.totalPrice}
                        />
                  
                    ))}

                    <tr className={classes['no-pointer-events']}>
                      <td colSpan={7}></td>
                    </tr>

                    <tr className={classes['no-pointer-events']}>
                      <td colSpan={4} className={`${classes.summary} ${classes['left-top-radius']} ${classes['cell']}`}>
                        Итог:
                      </td>
                      <td className={`${classes.text} ${classes['right-top-radius']} ${classes['cell']}`}>
                        {totalPrice} ₽
                      </td>
                    </tr>

                    <tr className={classes['no-pointer-events']}>
                      <td colSpan={4} className={`${classes.summary} ${classes['last-cell']}`}>
                        Скидки:
                      </td>
                      <td className={`${classes.text} `}>{totalDiscount} ₽</td>
                    </tr>

                    <tr className={classes['no-pointer-events']}>
                      <td colSpan={4} className={`${classes.summary} ${classes['left-bottom-radius']}`}>
                        Вес:
                      </td>
                      <td className={`${classes.text} ${classes['right-bottom-radius']}`}>{totalWeight} кг</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr className={classes['no-pointer-events']}>
            <td colSpan={7}></td>
          </tr>
          <tr className={classes['no-pointer-events']}>
            <td colSpan={7}></td>
          </tr>
        </>
      )}
    </>
  );
};

export default Order;
