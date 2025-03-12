import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

const OrderScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  React.useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [success, history, order]);

  const placeOrderHandler = () => {
    dispatch(createOrder({ orderItems: cartItems, shippingAddress, paymentMethod }));
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div>
        <h2>Order Summary</h2>
        <div>
          <h3>Shipping</h3>
          <p>{shippingAddress.address}</p>
        </div>
        <div>
          <h3>Payment Method</h3>
          <p>{paymentMethod}</p>
        </div>
        <div>
          <h3>Order Items</h3>
          {cartItems.map((item) => (
            <div key={item.product}>
              <img src={item.image} alt={item.name} />
              <div>{item.name}</div>
              <div>
                {item.qty} x ${item.price}
              </div>
            </div>
          ))}
        </div>
        <button onClick={placeOrderHandler}>Place Order</button>
      </div>
    </div>
  );
};

export default OrderScreen;
