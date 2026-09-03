import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { addItem } from './CartSlice';

const plantData = [
  {
    name: 'Snake Plant',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    price: 24,
    category: 'Air Purifying Plants',
  },
  {
    name: 'Spider Plant',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    price: 20,
    category: 'Air Purifying Plants',
  },
  {
    name: 'Peace Lily',
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
    price: 28,
    category: 'Air Purifying Plants',
  },
  {
    name: 'Lavender',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    price: 18,
    category: 'Aromatic Fragrant Plants',
  },
  {
    name: 'Jasmine',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
    price: 22,
    category: 'Aromatic Fragrant Plants',
  },
  {
    name: 'Rosemary',
    image:
      'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=900&q=80',
    price: 16,
    category: 'Aromatic Fragrant Plants',
  },
  {
    name: 'ZZ Plant',
    image:
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80',
    price: 30,
    category: 'Low Maintenance Plants',
  },
  {
    name: 'Pothos',
    image:
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=900&q=80',
    price: 19,
    category: 'Low Maintenance Plants',
  },
  {
    name: 'Chinese Evergreen',
    image:
      'https://images.unsplash.com/photo-1446071103084-c257b5f70672?auto=format&fit=crop&w=900&q=80',
    price: 26,
    category: 'Low Maintenance Plants',
  },
];

export function Header() {
  const cartItems = useSelector((state) => state.cart);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="topbar">
      <div className="brand-block">
        <Link to="/">Paradise Nursery</Link>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Plants
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => `nav-link cart-link ${isActive ? 'active' : ''}`}
        >
          <span aria-label="shopping cart">🛒</span>
          <span>Cart</span>
          <span className="cart-badge">{totalCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const groupedPlants = plantData.reduce((groups, plant) => {
    if (!groups[plant.category]) {
      groups[plant.category] = [];
    }

    groups[plant.category].push(plant);
    return groups;
  }, {});

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        name: plant.name,
        image: plant.image,
        cost: plant.price,
      })
    );

    setAddedItems((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <>
      <Header />

      <main className="product-page">
        <h2 className="page-title">Plant Collection</h2>

        {Object.entries(groupedPlants).map(([category, plants]) => (
          <section key={category} className="category-section">
            <h3 className="category-heading">{category}</h3>

            <div className="products-grid">
              {plants.map((plant) => (
                <article key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} />

                  <div className="plant-info">
                    <h4 className="plant-name">{plant.name}</h4>
                    <p className="plant-price">${plant.price.toFixed(2)}</p>
                    <button
                      type="button"
                      className="add-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={Boolean(addedItems[plant.name])}
                    >
                      {addedItems[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export default ProductList;
