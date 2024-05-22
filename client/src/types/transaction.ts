export type DepositRequest = {
  amount: string;
};

export type WithdrawRequest = {
  amount: string;
};

export type History = {
  id: string;
  createdAt: string;
  type: string;
  amount: string;
  status: string;
  name: string;
};
