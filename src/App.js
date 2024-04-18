import './App.css';
import Calculator from './Calculator';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <a href="https://www.harmonicdecisions.com"><img src="logo.png" alt="Harmonic Decisions"/></a>
          </div>
          <ul className="nav-links">
            <li><a href="https://www.harmonicdecisions.com/how-does-the-pricing-calculator-work">How Does It Work?</a></li>
            <li><a href="https://www.harmonicdecisions.com/the-decoy-effect">The Decoy Effect</a></li>
          </ul>
        </div>
      </nav>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
