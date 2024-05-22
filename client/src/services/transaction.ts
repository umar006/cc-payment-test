import { Deposit, Withdraw } from "../types";

const BASE_URL = "http://localhost:3000";

export const createDeposit = async (deposit: Deposit) => {
  return await fetch(`${BASE_URL}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deposit),
  });
};

export const createWithdraw = async (withdraw: Withdraw) => {
  return await fetch(`${BASE_URL}/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(withdraw),
  });
};

export const getHistories = async () => {
  const response = await fetch("http://localhost:3000/histories");
  const data = await response.json();
  return data;
};
