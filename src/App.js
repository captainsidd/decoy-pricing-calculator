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
            <li><a href="https://www.harmonicdecisions.com/how-does-the-pricing-calculator-work">How Does This Work?</a></li>
            <li><a href="https://www.harmonicdecisions.com/the-decoy-effect">More About The Decoy Effect</a></li>
          </ul>
        </div>
      </nav>
      <div className='instructions-container-above'>
        <h1 className='instructions-heading'>The Decoy Effect: Psychological Pricing</h1>
        <p className='instructions-heading-description'>The decoy effect is when people tend to change their choices when presented with a less attractive option (the decoy), which makes one of the original options more appealing.</p>

        <h2 className='instructions-heading'>How the Decoy Effect Works</h2>
        <p className='instructions-heading-description'>Imagine you're at a movie theater and faced with three popcorn options: a small for $2.50, a medium for $5.00 and a large for $7.50. Most people might opt for the medium because it's the one in the middle. However, movie theaters often price mediums at a higher price, such as $6.50. This makes the large popcorn seem like a better deal. This is the essence of the decoy effect.</p>
      </div>
      <Calculator></Calculator>
      <div className='instructions-container-below'>
        <h2 className='instructions-heading'>Using the Decoy Pricing Calculator</h2>
        <ol className='instructions-heading-instructions'>
          <li><b>Identify the products/services you want to offer</b>: For each package, enter the hours of work and the cost of materials required.</li>
          <li><b>Enter your hourly rate</b>. If you don't know your hourly rate, try this formula: <pre>($ Your annual basic salary + 30%) / 2000 hours</pre></li>
          <li><b>Select your target package</b>: This is the package you want to incentivize people to buy. The price of other packages will be adjusted acccordingly.</li>
          <li><b>Find your suggested pricing!</b>: Under the hood, we're using a simple algorithm to suggest prices to maximize sales of your <b>Target</b> package relative to other packages.</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
