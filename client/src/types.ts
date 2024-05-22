export type Deposit = {
  order_id: string;
  amount: string;
  timestamp: Date;
};

export type Withdraw = {
  order_id: string;
  amount: string;
  timestamp: Date;
};

export type TransactionHistory = {
  id: string;
  createdAt: string;
  type: string;
  amount: string;
  status: string;
  name: string;
};
