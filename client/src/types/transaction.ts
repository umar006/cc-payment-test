export type DepositRequest = {
  order_id: string;
  amount: string;
  timestamp: Date;
};

export type WithdrawRequest = {
  order_id: string;
  amount: string;
  timestamp: Date;
};

export type History = {
  id: string;
  createdAt: string;
  type: string;
  amount: string;
  status: string;
  name: string;
};
