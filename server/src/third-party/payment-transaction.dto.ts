export type PaymentDepositResponse = {
  orderId: string;
  amount: number;
  status: number;
};

export type PaymentWithdrawResponse = {
  orderId: string;
  amount: number;
  status: number;
};
