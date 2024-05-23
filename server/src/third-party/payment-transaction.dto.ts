export type PaymentDepositResponse = {
  order_id: string;
  amount: number;
  status: number;
};

export type PaymentWithdrawResponse = {
  order_id: string;
  amount: number;
  status: number;
};
