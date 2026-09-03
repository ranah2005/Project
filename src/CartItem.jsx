import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header } from './ProductList';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
      return;
    }

    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity - 1,
      })
    );
  };

  return (
    <>
      <Header />

      <main className="cart-page">
        <h2 className="page-title">Your Cart</h2>

        <div className="cart-summary">
          <div className="summary-card">
            <span>Total Plants</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="summary-card">
            <span>Total Cost</span>
            <strong>${totalCost.toFixed(2)}</strong>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty.</h3>
            <p>Add a few plants to start creating your cozy indoor garden.</p>
          </div>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <article key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.cost.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="qty-button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => handleDecrease(item)}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-money">
                  <span className="subtotal">Subtotal: ${(item.cost * item.quantity).toFixed(2)}</span>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => dispatch(removeItem(item.name))}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button type="button" className="checkout-button" onClick={() => alert('Coming Soon')}>
            Checkout
          </button>
          <button type="button" className="secondary-button" onClick={() => navigate('/products')}>
            Continue Shopping
          </button>
        </div>
      </main>
    </>
  );
}

export default CartItem;
