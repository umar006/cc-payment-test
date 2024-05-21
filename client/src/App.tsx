import { type FormEvent, useState } from 'react';
import './App.css';

function App() {
  const [deposit, setDeposit] = useState('0');
  const [withdraw, setWithdraw] = useState('0');

  const handleDepositSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleWithdrawSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>deposit</h2>
      <form onSubmit={handleDepositSubmit}>
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
      <form onSubmit={handleWithdrawSubmit}>
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
