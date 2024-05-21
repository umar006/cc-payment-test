import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";

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
  const [deposit, setDeposit] = useState("0.00");
  const [withdraw, setWithdraw] = useState("0.00");

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
    onSuccess: () => {
      setDeposit("0.00");
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
    onSuccess: () => {
      setWithdraw("0");
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

  const handleChangeDeposit = (e: ChangeEvent<HTMLInputElement>) => {
    let depositVal = e.target.value;
    if (depositVal === "") {
      depositVal = "0.00";
    }
    setDeposit(depositVal);
  };

  return (
    <>
      <h2>deposit</h2>
      <form onSubmit={handleDepositSubmit}>
        <label>
          <input
            type="number"
            onChange={handleChangeDeposit}
            min="0.01"
            step="0.01"
            value={deposit}
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
            min="0.01"
            step="0.01"
            value={withdraw}
          />
        </label>
        <button type="submit">withdraw</button>
      </form>
    </>
  );
}

export default App;
