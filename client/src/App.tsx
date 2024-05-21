import { type FormEvent, useState } from "react";
import "./App.css";
import { useMutation } from "@tanstack/react-query";

type Deposit = {
  order_id: string;
  amount: string;
  timestamp: Date;
};

type Withdraw = {
  order_id: string;
  amount: string;
  timestamp: Date;
};

function App() {
  const [deposit, setDeposit] = useState("0");
  const [withdraw, setWithdraw] = useState("0");

  const mutateDeposit = useMutation({
    mutationFn: (deposit: Deposit) => {
      return fetch("http://localhost:3000/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deposit),
      });
    },
  });

  const mutateWithdraw = useMutation({
    mutationFn: (withdraw: Withdraw) => {
      return fetch("http://localhost:3000/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(withdraw),
      });
    },
  });

  const handleDepositSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createDeposit: Deposit = {
      order_id: window.crypto.randomUUID(),
      amount: parseFloat(deposit).toFixed(2),
      timestamp: new Date(),
    };
    mutateDeposit.mutate(createDeposit);
  };

  const handleWithdrawSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createWithdraw: Withdraw = {
      order_id: window.crypto.randomUUID(),
      amount: parseFloat(withdraw).toFixed(2),
      timestamp: new Date(),
    };
    mutateWithdraw.mutate(createWithdraw);
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
