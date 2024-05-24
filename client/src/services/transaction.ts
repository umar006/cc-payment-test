import { ErrorResponse } from "../types/error";
import type {
  DepositRequest,
  History,
  WithdrawRequest,
} from "../types/transaction";

const BASE_URL = "http://localhost:3000";

export const createDeposit = async (deposit: DepositRequest) => {
  const res = await fetch(`${BASE_URL}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deposit),
  });

  if (!res.ok) {
    const error = (await res.json()) as ErrorResponse;
    if (Array.isArray(error.message)) {
      throw new Error(error.message[0]);
    }
    throw new Error(error.message);
  }
};

export const createWithdraw = async (withdraw: WithdrawRequest) => {
  const res = await fetch(`${BASE_URL}/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(withdraw),
  });

  if (!res.ok) {
    const error = (await res.json()) as ErrorResponse;
    if (Array.isArray(error.message)) {
      throw new Error(error.message[0]);
    }
    throw new Error(error.message);
  }
};

export const getHistories = async (): Promise<History[]> => {
  const response = await fetch("http://localhost:3000/histories");

  if (!response.ok) {
    const error = (await response.json()) as ErrorResponse;
    if (Array.isArray(error.message)) {
      throw new Error(error.message[0]);
    }
    throw new Error(error.message);
  }

  const data = await response.json();
  return data;
};
