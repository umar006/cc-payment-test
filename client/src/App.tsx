import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import {
  createDeposit,
  createWithdraw,
  getHistories,
} from "./services/transaction";
import type {
  DepositRequest,
  History,
  WithdrawRequest,
} from "./types/transaction";

function App() {
  const [deposit, setDeposit] = useState("0.00");
  const [withdraw, setWithdraw] = useState("0.00");
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<History[]>({
    queryKey: ["histories"],
    queryFn: getHistories,
  });

  const mutateDeposit = useMutation({
    mutationFn: createDeposit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histories"] });
      setDeposit("0.00");
    },
    onError: (error) => {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    },
  });

  const mutateWithdraw = useMutation({
    mutationFn: createWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["histories"] });
      setWithdraw("0.00");
    },
    onError: (error) => {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    },
  });

  const handleDepositSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createDeposit: DepositRequest = {
      amount: parseFloat(deposit).toFixed(2),
    };
    mutateDeposit.mutate(createDeposit);
  };

  const handleWithdrawSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createWithdraw: WithdrawRequest = {
      amount: parseFloat(withdraw).toFixed(2),
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

  const handleChangeWithdraw = (e: ChangeEvent<HTMLInputElement>) => {
    let withdrawVal = e.target.value;
    if (withdrawVal === "") {
      withdrawVal = "0.00";
    }
    setWithdraw(withdrawVal);
  };

  const transactionHistoryList = () => {
    const render = () => {
      if (isLoading) {
        return (
          <tr>
            <td colSpan={6}>Loading...</td>
          </tr>
        );
      }

      if (isError) {
        return (
          <tr>
            <td colSpan={6}>Failed to load transaction histories</td>
          </tr>
        );
      }

      return data?.map((val) => {
        const formattedDate = new Date(val.createdAt).toLocaleString();
        return (
          <tr key={val.orderId}>
            <td>{val.orderId}</td>
            <td>{formattedDate}</td>
            <td>{val.type}</td>
            <td>{val.amount}</td>
            <td>{val.status === 1 ? "success" : "failed"}</td>
            <td>{val.name}</td>
          </tr>
        );
      });
    };

    return (
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>CreatedAt</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{render()}</tbody>
      </table>
    );
  };

  return (
    <>
      <h2>deposit</h2>
      {error !== "" && <div className="error">{error}</div>}
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
      {error !== "" && <div className="error">{error}</div>}
      <form onSubmit={handleWithdrawSubmit}>
        <label>
          <input
            type="number"
            onChange={handleChangeWithdraw}
            min="0.01"
            step="0.01"
            value={withdraw}
          />
        </label>
        <button type="submit">withdraw</button>
      </form>
      <h2>Transaction History List</h2>
      {transactionHistoryList()}
    </>
  );
}

export default App;
