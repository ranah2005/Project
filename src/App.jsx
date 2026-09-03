import { useNavigate } from 'react-router-dom';
import AboutUs from './AboutUs';

function App() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <div className="landing-overlay">
        <h1 className="company-name">Paradise Nursery</h1>
        <AboutUs />
        <button type="button" className="cta-button" onClick={() => navigate('/products')}>
          Get Started
        </button>
      </div>
    </main>
  );
}

export default App;
