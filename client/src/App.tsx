import { useState } from 'react';
import './App.css';

function App() {
  const [deposit, setDeposit] = useState('0');
  const [withdraw, setWithdraw] = useState('0');

  return (
    <>
      <h2>deposit</h2>
      <form>
        <label>
          <input
            type="number"
            onChange={(e) => setDeposit(e.target.value)}
            min="0"
            step="any"
          />
        </label>
        <button type="submit">deposit</button>
      </form>
      <h2>withdraw</h2>
      <form>
        <label>
          <input
            type="number"
            onChange={(e) => setWithdraw(e.target.value)}
            min="0"
            step="any"
          />
        </label>
        <button type="submit">withdraw</button>
      </form>
    </>
  );
}

export default App;
